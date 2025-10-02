const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const hotel = require("../models/hotel.js");
const Review = require("../models/review.js");
const {validateReview,toValidateListing,isAuthor} = require("../middlewares.js");
const reviewController = require("../controllers/Review.js");


router.post("/",validateReview,toValidateListing,wrapAsync(reviewController.postReview));

router.delete("/:reviewId",toValidateListing,isAuthor,wrapAsync(reviewController.deleteReview));


module.exports = router;