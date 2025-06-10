import upload from "../config/multerConfig.js";

const singleImageUploader = async (req, res, next) => {
    try {
        await upload.single("image")(req, res, (err) => {
            if(err) {
                return res.status(400).json({
                    data: null,
                    success: false,
                    message: "Image upload failed",
                    error: err.message,
                })
            }
            next();
        })
    } catch (error) {
        return res.status(500).json({
            data: null,
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
}

export default singleImageUploader;