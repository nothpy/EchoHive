const express = require("express");
const router  = express.Router();
// const ExpressError = require("../util/ExpressError.js");
// const wrapAsync = require("../util/wrapAsync.js");

// profile route
router.get("/", async(req, res)=>{
    res.render("users/userProfile.ejs");
});

module.exports = router;
