const express = require("express");
const router  = express.Router();
const homeController = require("../controllers/home.js")

//index Route 
router.get("/", homeController.getAllposts);
module.exports = router;