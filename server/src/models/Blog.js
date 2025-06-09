import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean
    }
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;