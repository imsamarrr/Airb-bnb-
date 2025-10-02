const User = require("../models/user");
const express = require("express");


module.exports.renderSignup = (req, res) => {
    res.render("./users/user.ejs");
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registredUser = await User.register(newUser, password); 5
        req.login(registredUser, (err) => {
            if (err) {
                next();
            }
            req.flash("success", "Registered successfully");
            res.redirect("/listing");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

}

module.exports.renderLogin = (req, res) => {
    res.render("./users/login.ejs");
}

module.exports.login =  (req, res) => {

    req.flash("success", "Welcome back to wanderlust");
    res.redirect(res.locals.redirectUrl || "/listing");
}

module.exports.logout =  (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have been logged out");
        res.redirect("/listing");
    })
}