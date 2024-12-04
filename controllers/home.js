const Post = require("../models/userProfileSchema.js");

module.exports.getAllposts = async (req, res) => {
    console.log("I am Index route in home.js file folder routes");
    const allPost = await Post.find({});
    res.render("users/index.ejs", { allPost });
}