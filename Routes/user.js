const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const { toSaveUrl } = require("../middlewares.js");
const userController = require("../controllers/user.js");


router.route("/signup")
.get(userController.renderSignup)
.post(userController.signup);

router.route("/login")
.get(userController.renderLogin)
.post(toSaveUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login);

router.get("/logout", userController.logout);

module.exports = router;

passport.authenticate("local", { failureRedirect: "/login", failureFlash: true })
