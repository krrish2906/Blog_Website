import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://asset.cloudinary.com/krishbansal/98b575d92f541505539560ed8a843d08"
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;