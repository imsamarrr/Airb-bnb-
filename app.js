const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const app = express();
const listings = require("./Routes/listing.js");
const show = require("./Routes/show.js");
const review = require("./Routes/Review.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const user = require("./Routes/user.js");
const User = require("./models/user.js");
const passport = require("passport");
const localStrategy = require("passport-local");

if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

let dburl = process.env.ATLAS_URL;

const store = MongoStore.create({
    mongoUrl : dburl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24 * 3600,
});


const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 1000*60*60*24*7,
        maxAge : 1000*60*60*24*7,
        httpOnly : true
    }
}

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new localStrategy(User.authenticate()));

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "public")));
app.use("/listing",listings);
app.use("/show",show);
app.use("/show/:id/review",review);
app.use("/",user);

app.engine("ejs",ejsMate);

main()
.then((res)=>{
    console.log("connection mongodb successfull");
})

async function main(){
    await mongoose.connect(dburl);
}

let port = 8080;``

// HOME ROUTE
// app.get("/",(req,res)=>{
//     res.send("Hello i am samar");
// });




app.all(/.*/,(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

// Middlewares


app.use((err,req,res,next)=>{
    let {statusCode = 500,message =  "something went wrong"} = err;
    res.status(statusCode).render("error.ejs",{err});
});

app.listen(port,()=>{
    console.log(`server listening at ${port}`);
})
