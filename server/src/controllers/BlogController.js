import BlogService from "../services/BlogService.js";
const blogService = new BlogService();

export const createBlog = async (req, res) => {
    try {
        const newBlog = await blogService.createBlog(req.body);
        return res.status(201).json({
            data: newBlog,
            success: true,
            message: "Blog created successfully",
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });       
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const deletedBlog = await blogService.deleteBlog(blogId);
        return res.status(200).json({
            data: deletedBlog,
            success: true,
            message: "Blog deleted successfully",
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blogService.getBlogById(blogId);
        return res.status(200).json({
            data: blog,
            success: true,
            message: "Blog fetched successfully",
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const getAllPublishedBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getAllPublishedBlogs();
        return res.status(200).json({
            data: blogs,
            success: true,
            message: "Blogs fetched successfully",
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const toggleBlogPublishStatus = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blogService.togglePublishStatus(blogId);
        return res.status(200).json({
            data: blog,
            success: true,
            message: "Blog publish status toggled successfully",
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}