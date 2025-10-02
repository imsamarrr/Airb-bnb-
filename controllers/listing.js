require('dotenv').config();

const hotel = require("../models/hotel.js");
const express = require("express");
const ExpressError = require("../utils/ExpressError.js");
const flash = require("connect-flash");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });



module.exports.index = async (req, res) => {
    let hotels = await hotel.find({});
    res.render("./listings/index.ejs", { hotels });
}

module.exports.renderListing = (req, res) => {
    res.render("./listings/new.ejs");
}

module.exports.postListing = async(req, res) => {

    let response = await geocodingClient.forwardGeocode({
        query: req.body.hotel.location,
        limit: 1
    })
    .send();

    if (!req.body.hotel) {
        throw new ExpressError(400, "send valid data");
    }
    let newhotel = new hotel(req.body.hotel);
    let url = req.file.path;
    let filename = req.file.filename;
    newhotel.image = { url, filename };
    newhotel.owner = req.user._id;
    newhotel.geometry = response.body.features[0].geometry;
    await newhotel.save();
    req.flash("success", "New Hotel added successfully");
    res.redirect("/listing");
}

