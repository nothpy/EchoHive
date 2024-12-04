const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the User Post Schema with image field
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is required
    },
    content: {
        type: String,
        required: true, // Content is required
    },

    createdAt: {
        type: Date,
        default: Date.now, // Default value to the current date
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Default value to the current date
    },
    tags: {
        type: [String], // Array of strings for tags related to the post
    },
    likes: {
        type: Number,
        default: 0, // Default number of likes
    },
    image: {
        type: String, // URL or path to the uploaded image
        required: true, // Image is required
    },
});

// Create the Post model from the schema
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
