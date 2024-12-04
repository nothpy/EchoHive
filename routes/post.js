const express = require("express");
const router  = express.Router();
// const ExpressError = require("../util/ExpressError.js");

// Create route 
router.post("/", async (req, res, next) => {
    const newPost = new Listing(req.body.listing);
    await newPost.save();

    req.flash("success", "New Listing created");
    res.redirect("/listings");

});