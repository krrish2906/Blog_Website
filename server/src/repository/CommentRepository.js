import CrudRepository from "./CrudRepository.js";
import Comment from "../models/Comment.js";

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }

    async getBlogComments(blogId) {
        try {
            const comments = await Comment.find({
                blog: blogId,
                isApproved: true
            }).sort({ createdAt: -1 });
            return comments;
        } catch (error) {
            throw new Error(`Error fetching comments for blog ${blogId}: ${error.message}`);
        }
    }

    async approve(commentId) {
        try {
            const comment = await Comment.findByIdAndUpdate(commentId, { isApproved: true }, { new: true });
            return comment;
        } catch (error) {
            throw new Error(`Error approving comment ${commentId}: ${error.message}`);
        }
    }

    async deleteAllCommentsOfBlog(blogId) {
        try {
            const response = await Comment.deleteMany({ blog: blogId });
            return response;
        } catch (error) {
            throw new Error(`Error deleting comments: ${error.message}`);
        }
    }
}

export default CommentRepository;