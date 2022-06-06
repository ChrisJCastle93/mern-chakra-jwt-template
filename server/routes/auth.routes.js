const router = require("express").Router();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const saltRounds = 10;

const User = require("../models/User.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/auth.js");

// put id in payload
function generateJwtToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

// const passport = require("passport");

router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

router.post("/signup", isLoggedOut, (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({ errorMessage: "Please provide your username." });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  User.findOne({ username }).then((found) => {
    if (found) {
      return res.status(400).json({ errorMessage: "Username already taken." });
    }

    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return User.create({
          username,
          email,
          password: hashedPassword,
        });
      })
      .then((user) => {
        res.status(201).json({ _id: user.id, username: user.username, email: user.email, token: generateJwtToken(user._id) });
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage: "Username needs to be unique. The username you chose is already in use.",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

router.post("/login", isLoggedOut, (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ errorMessage: "Please provide your username." });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ errorMessage: "Wrong credentials." });
      }

      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: "Wrong credentials." });
        }
        res.status(201).json({ _id: user.id, username: user.username, email: user.email, token: generateJwtToken(user._id) });
      });
    })

    .catch((err) => {
      next(err);
    });
});

router.get("/me", isAuth, async (req, res, next) => {
  const { _id, username, email } = await User.findById(req.user.id);
  res.status(200).json({ id: _id, username, email });
});

// GOOGLE REACT ROUTES

router.post("/googleAuth", (req, res, next) => {
  console.log("GOOGLE AUTH");
  const { email, googleId } = req.body;
  console.log("REQ BODy", req.body);

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        console.log("NO USER EXISTS, CREATING ONE");
        // CREATE AND RETURN USER HERE
        return User.create({
          email,
          googleId,
        })
          .then((user) => {
            res.status(201).json({ _id: user.id, username: user.username, email: user.email, token: generateJwtToken(user._id) });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        console.log("USER FOUND!");
        console.log(user)
        // ADD googleId to USER
        if (!user.googleId) {
          User.findByIdAndUpdate(user._id, { googleId: googleId }, { new: true });
        }
        // SEND USER BACK WITH A TOKEN
        res.status(201).json({ _id: user.id, username: user.username, email: user.email, token: generateJwtToken(user._id) });
      }
    })

    .catch((err) => {
      next(err);
    });
});

// // GOOGLE SSO ROUTES - PASSPORT

// router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/auth/google/failure" }), function (_req, res) {
//   res.redirect("/");
// });

module.exports = router;
