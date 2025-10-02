const mongoose = require("mongoose");
const hoteldata = require("./data");
const hotel = require("../models/hotel");

main()
.then((res)=>{
    console.log("connection mongodb successfull");
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

let initDb  = async()=>{
    await hotel.deleteMany({});
    hoteldata.data = hoteldata.data.map((obj)=>({...obj ,owner : "68ce3fd282743c33bd56a5f5"}))
    await hotel.insertMany(hoteldata.data);
    console.log("Data saved successfully");
}

initDb();