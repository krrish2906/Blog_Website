import CommentRepository from "../repository/CommentRepository";

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
    }

    async create(commentData) {
        try {
            const comment = await this.commentRepository.create(commentData);
            return comment;
        } catch (error) {
            throw new Error(`Error creating comment: ${error.message}`);
        }
    }

    async getBlogComments(blogId) {
        try {
            const comments = await this.commentRepository.getBlogComments(blogId);
            return comments;
        } catch (error) {
            throw new Error(`Error fetching comments for blog ${blogId}: ${error.message}`);
        }
    }
}

export default CommentService;