export const validateBlogInfo = (req, res, next) => {
    if(!req.body) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "Blog Details are required",
            error: "Missing Data"
        });
    }
    
    const { title, content, author, category, isPublished } = req.body;
    if (!title || !content || !author || !category || isPublished === undefined) {
        return res.status(400).json({
            data: {},
            success: false,
            error: "Some blog details are missing",
            message: "Blog details are required"
        });
    }
    next();
}