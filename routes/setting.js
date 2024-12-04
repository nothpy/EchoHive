const express = require("express");
const router  = express.Router();

//setting route
router.get("/", async(req, res)=>{
    res.render("users/setting.ejs");
});

module.exports = router;
