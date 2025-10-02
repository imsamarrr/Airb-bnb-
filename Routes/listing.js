const express = require("express");
const router = express.Router();
const hotel = require("../models/hotel.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");

const flash = require("connect-flash");
const {toValidateListing,validateListing} = require("../middlewares.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))
.post(upload.single("hotel[image]"),validateListing,wrapAsync(listingController.postListing));

router.get("/new",toValidateListing,listingController.renderListing);


module.exports = router;



