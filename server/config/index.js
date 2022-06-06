const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const MONGO_URI = process.env.MONGO_URI;

// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = async (app) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "http://localhost:3000",
    })
  );

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // app.use(passport.initialize());
  // app.use(passport.session());

  // passport.serializeUser((user, cb) => {
  //   cb(null, user.id);
  // });

  // passport.deserializeUser((id, cb) => {
  //   User.findById(id)
  //     .then((user) => {
  //       cb(null, user);
  //     })
  //     .catch((error) => cb(error));
  // });

  // PASSPORT LOCAL STRAT TO AUTHENTICATE LOGIN

  // passport.use(
  //   new LocalStrategy(
  //     {
  //       passReqToCallback: true,
  //       usernameField: "username",
  //       passwordField: "password",
  //     },
  //     (req, username, password, done) => {
  //       User.findOne({ username })
  //         .then((user) => {
  //           if (!user) {
  //             req.session.error = "Invalid Login Details";
  //             return done(null, false, {
  //               message: "That username is not registered",
  //             });
  //           }
  //           bcrypt.compare(password, user.password).then((result) => {
  //             if (result) {
  //               req.session.currentUser = user;
  //               req.session.success = "Successful Login";
  //               return done(null, user);
  //             } else {
  //               req.session.error = "Invalid Login Details";
  //               return done(null, false, {
  //                 message: "Password incorrect",
  //               });
  //             }
  //           });
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           done(error);
  //         });
  //     }
  //   )
  // );

  // // PASSPORT GOOGLE STRAT TO FACILITATE SSO

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.googleClientId,
  //       clientSecret: process.env.googleSecret,
  //       callbackURL: "/auth/google/callback",
  //       passReqToCallback: true,
  //     },
  //     function (req, accessToken, refreshToken, profile, cb) {
  //       User.findOrCreate(
  //         {
  //           // googleId: profile.id,
  //           email: profile.emails[0].value,
  //           firstName: profile.name.givenName,
  //           lastName: profile.name.familyName,
  //         },
  //         function (err, user) {
  //           req.session.currentUser = user;
  //           return cb(err, user);
  //         }
  //       );
  //     }
  //   )
  // );

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "super hyper secret key",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: process.env.NODE_ENV === "production",
      },
    })
  );

  app.use((req, res, next) => {
    req.user = req.session.user || null;
    next();
  });
};
