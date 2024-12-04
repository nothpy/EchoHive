const express = require("express");
const router = express.Router();
// const User = require("../models/userLS.js");
const wrapAsync = require("../util/wrapAsync.js");
const { saveRedirectUrl} = require("../middleware.js");
const passport = require("passport");
const userController = require("../controllers/user.js")

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(userController.signUpPage));
router.get("/login", userController.loginPage);

router.post("/login", saveRedirectUrl, passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.loginAuthenticate
);

router.get("/logout", userController.logoutUser);
module.exports = router;