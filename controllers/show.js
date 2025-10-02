const hotel = require("../models/hotel.js");
const express = require("express");

module.exports.renderEdit = async(req,res)=>{
    let {id} = req.params;
    let hotels = await hotel.findById(id);
    res.render("./listings/edit.ejs",{hotels});
}

module.exports.postEdit = async(req,res,next)=>{
    let { id } = req.params;
    let editedhotel = req.body.hotel;
    let url = req.file.path;
    let filename = req.file.filename;
    editedhotel.image = {url,filename};
    await hotel.findByIdAndUpdate(id,{...editedhotel});
    req.flash("success","Edited hotel");
    res.redirect(`/show/${id}`);
}

module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    let hotels = await hotel.findById(id).populate({
        path : "Review",
        populate : {
            path : "author",
        }
    }).populate("owner");
    if(!hotels) {
        req.flash("error","The page you are finding is not available");
        res.redirect("/listing");
    }else{
        res.render("./listings/show.ejs",{hotels});
    }
}

module.exports.deleteListing = async(req,res)=>{
    let { id } = req.params;
    console.log("Deleting hotel with ID:", id);
    let deleted_Hotel = await hotel.findByIdAndDelete(id);
    console.log(deleted_Hotel);
    req.flash("error","Deleted Successfully");
    res.redirect("/listing");
}