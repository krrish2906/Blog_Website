export const validateBlogInfo = (req, res, next) => {
    if(!req.body || !req.file) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "Blog Details and Image are required",
            error: "Missing Data or Image"
        });
    }
    
    const { title, content, author, category, isPublished } = req.body;
    if (!title || !content || !author || !category || isPublished === undefined) {
        return res.status(400).json({
            data: {},
            success: false,
            error: "Some blog details are missing or image is not uploaded",
            message: "Blog details and image are required"
        });
    }
    next();
}