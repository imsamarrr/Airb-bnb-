const mongoose = require("mongoose");
const Review = require("./review.js");

let hotelSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    image : {
        url : String,
        filename : String,
    },
    price : {
        type : Number,
        required : true,
        default : 0,
    },
    location : {
        type : String,
        required : true,

    },
    country : {
        type : String,
        required : true,
    },
    Review : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Review",
    }],
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    geometry : {
        type : {
            type : String,
            enum : ['Point'],
        },
        coordinates : {
            type : [Number],
            required : true,
        }
    }
})



hotelSchema.post("findOneAndDelete",async(hotel)=>{
    if(hotel){
        await Review.deleteMany({_id : {$in : hotel.Review}});
    }
});

let hotel = new mongoose.model("hotel",hotelSchema);

module.exports = hotel;