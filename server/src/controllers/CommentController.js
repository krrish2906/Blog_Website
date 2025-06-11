import CommentService from "../services/CommentService.js";
const commentService = new CommentService();

export const createComment = async (req, res) => {
    try {
        const commentData = {
            blog: req.body.blog,
            content: req.body.content,
            user: req.user.userId
        }
        const comment = await commentService.create(commentData);
        return res.status(201).json({
            data: comment,
            success: true,
            message: "Comment added for review",
            error: null 
        });
    } catch (error) {
        return res.status(201).json({
            data: null,
            success: false,
            message: "Failed to create comment",
            error: error.message 
        });
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const comments = await commentService.getBlogComments(blogId);
        return res.status(200).json({
            data: comments,
            success: true,
            message: "Comments fetched successfully",
            error: null 
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            success: false,
            message: "Failed to fetch comments",
            error: error.message 
        });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const comment = await commentService.deleteCommentById(commentId);
        return res.status(200).json({
            data: comment,
            success: true,
            message: "Comment deleted successfully",
            error: null 
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            success: false,
            message: "Failed to delete comment",
            error: error.message 
        });
    }
}

export const approveComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const comment = await commentService.approveComment(commentId);
        return res.status(200).json({
            data: comment,
            success: true,
            message: "Comment approved successfully",
            error: null 
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            success: false,
            message: "Failed to approve comment",
            error: error.message 
        });
    }
}

export const getAllCommentsForUserBlogs = async (req, res) => {
    try {
        const userId = req.user.userId;
        const comments = await commentService.getAllCommentsForUserBlogs(userId);
        return res.status(200).json({
            data: comments,
            success: true,
            message: "All comments for user's blogs fetched successfully",
            error: null 
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            success: false,
            message: "Failed to fetch comments for user's blogs",
            error: error.message 
        });
    }
}