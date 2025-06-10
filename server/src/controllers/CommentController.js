import CommentService from "../services/CommentService.js";
const commentService = new CommentService();

export const createComment = async (req, res) => {
    try {
        const { blog, user, content } = req.body;
        const comment = await commentService.create({ blog, user, content });
        return res.status(201).json({
            data: comment,
            success: true,
            message: "Comment created successfully",
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