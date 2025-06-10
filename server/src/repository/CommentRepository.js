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
}

export default CommentRepository;