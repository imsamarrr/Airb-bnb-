const express = require("express");
const router = express.Router();
const hotel = require("../models/hotel.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const {toValidateListing,isOwner,validateListing} = require("../middlewares.js");
const showController = require("../controllers/show.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})


router.route("/:id")
.put(upload.single("hotel[image]"),toValidateListing,isOwner,validateListing,wrapAsync(showController.postEdit))
.get(wrapAsync(showController.showListing))
.delete(toValidateListing,isOwner,wrapAsync(showController.deleteListing));

router.get("/:id/edit",toValidateListing,isOwner,wrapAsync(showController.renderEdit));


module.exports = router;