const router = require("express").Router();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const saltRounds = 10;

const User = require("../models/User.model");

const isAuth = require("../middleware/auth.js");

const generateJwtToken = require("../utils/generateJwtToken");

router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({ errorMessage: "Please provide your username." });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  User.findOne({ email }).then((found) => {
    if (found) {
      return res.status(400).json({ errorMessage: "Email already exists. Sign in with your username and password, or Google." });
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

router.post("/login", (req, res, next) => {
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
  const { email, username } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return User.create({
          email,
          username,
        })
          .then((user) => {
            res.status(201).json({ _id: user.id, username: user.username, email: user.email, token: generateJwtToken(user._id) });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(201).json({ _id: user.id, username: user.username, email: user.email, token: generateJwtToken(user._id) });
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
