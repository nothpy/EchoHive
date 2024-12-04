const express = require ("express");
const app = express();
const path = require("path");
const ejsMate = require('ejs-mate');
const session  = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userLS.js");
const ExpressError = require("./util/ExpressError.js");

const port = 8000;
const mongoose = require ("mongoose");
const Post = require("./models/userProfileSchema.js");

app.set("view engine", "ejs"); //Ye line batata hai ki aapka Express application kis template engine ka istemal karega. Is case mein, ejs (Embedded JavaScript) ko view engine ke roop mein set kiya gaya hai.  EJS aapko HTML pages banane ki suvidha deta hai jisme aap JavaScript code embed kar sakte hain, jisse dynamic content generate karna aasaan hota hai.
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const homeRouter = require("./routes/home.js");
const settingRouter = require("./routes/setting.js");
const profileRouter = require("./routes/profile.js");
const userRouter = require("./routes/user.js");
const errPageRouter = require("./routes/errPage.js");
const postCreateRouter = require("./routes/postcreate.js");



//mongoose connection
const MONGO_URL = 'mongodb://127.0.0.1:27017/socialMediaApp';
main().then((res) => {
    console.log("connection succesfully created");
}).catch(err => console.log(err));
async function main() {
    await mongoose.connect(MONGO_URL);
}

const sessionOptions ={
    secret: "secretkey",
    resave: false, // use to remove deprecated warning 
    saveUninitialized: true , // which session are not initialized then these session also save
    cookie: {
        expires: Date.now()+ 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    },
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res , next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
console.log("========================2===========================");

app.use("/home", homeRouter);
app.use("/setting", settingRouter);
app.use("/profile", profileRouter);
app.use("/", userRouter);
app.use("/pagenotfound", errPageRouter);
app.use("/new", postCreateRouter);




// Error Handling middleware 
app.all("*", (req, res, next)=>{
    // next(new ExpressError(404, "Page Not Found"));
    res.render("includes/ErrorPages.ejs");
});

app.use((err, req, res, next)=>{
    let {statusCode=500 , message="Something went wrong" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("Error.ejs", {err});
});
console.log("=======================3============================");
app.listen(port, ()=>{
    console.log(`app is running on port :${port}`)
});











// https://preview.themeforest.net/item/social-network-community-react-template/full_screen_preview/54238079?_ga=2.138235062.766165842.1730011806-2135097823.1730011806