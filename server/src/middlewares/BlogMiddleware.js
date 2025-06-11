export const validateBlogInfo = (req, res, next) => {
    if(!req.body || !req.file) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "Blog Details and Image are required",
            error: "Missing Data or Image"
        });
    }

    const blogData = JSON.parse(req.body.blog);
    const { title, content, category, isPublished } = blogData;
    const { userId } = req.user;
    
    if (!title || !content || !userId || !category || typeof isPublished === 'undefined') {
        return res.status(400).json({
            data: {},
            success: false,
            error: "Some blog details are missing or image is not uploaded",
            message: "Blog details and image are required"
        });
    }
    req.body.blog = blogData;
    next();
}

export const validatePrompt = (req, res, next) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "Prompt is required",
            error: "Missing prompt, can't generate the content"
        });
    }
    next();
}