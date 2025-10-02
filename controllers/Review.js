const hotel = require("../models/hotel.js");
const Review = require("../models/review.js");
const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview,toValidateListing,isAuthor} = require("../middlewares.js");
const reviewController = require("../controllers/Review.js");

module.exports.postReview = async(req,res)=>{
    let { id } = req.params;
    let hotels = await hotel.findById(id);
    let newReview = new Review(req.body.Review);
    newReview.author = req.user._id;
    hotels.Review.push(newReview)._id;
    await hotels.save();
    await newReview.save();
    res.redirect(`/show/${req.params.id}`);
}

module.exports.deleteReview = async(req,res)=>{
    let { id,reviewId } = req.params;
    let listingsdelete = await hotel.findByIdAndUpdate(id,{$pull : {Review : reviewId}});
    let deletedReview = await Review.findById(reviewId);
    console.log(deletedReview);
    res.redirect(`/show/${req.params.id}`);
}