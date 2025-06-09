export const validateCommentInfo = (req, res, next) => {
    if(!req.body) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "Comment Details are required",
            error: "Missing Data"
        });
    }
    
    const { blog, content } = req.body;
    if (!blog || !content) {
        return res.status(400).json({
            data: {},
            success: false,
            error: "Some comment details are missing",
            message: "Comment details are required"
        });
    }
    next();
}