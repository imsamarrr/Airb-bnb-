const hotel = require("./models/hotel");
const Review = require("./models/review");
const {listingSchema,reviewSchema} = require("./schema");
const ExpressError = require("./utils/ExpressError");


module.exports.toValidateListing = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You are not logged in ");
        return res.redirect("/login");
    }
    next();
}

module.exports.toSaveUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let { id }  = req.params;
    let listing  = await hotel.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission");
        return res.redirect(`/show/${id}`);
    }
    next();
}


module.exports.validateReview = (req,res,next)=>{
    let result = reviewSchema.validate(req.body);
    if(result.error){
        let errMsg = result.error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    } else{
        next();
    }
}


module.exports.validateListing = (req,res,next)=>{
    let result = listingSchema.validate(req.body);
    if(result.error){
        let errMsg = result.error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    } else{
        next();
    }
}

module.exports.isAuthor = async(req,res,next)=>{
    let { id,reviewId }  = req.params;
    let review  = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission");
        return res.redirect(`/show/${id}`);
    }
    next();
}
