import imagekit from "../config/imagekitConfig.js";

export const uploadImage = async(fileBuffer, filename) => {
    try {
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: filename,
            folder: "/blogs"
        });
        return response;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}

export const imageURL = (imagePath) => {
    const optimizedImageURl = imagekit.url({
        path: imagePath,
        transformation: [
            { quality: 'auto' },
            { format: 'webp' },
            { width: '1280' }
        ]
    });
    return optimizedImageURl;
}