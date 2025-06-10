import ImageKit from "imagekit";
import { serverConfig } from "./serverConfig.js";

const imagekit = new ImageKit({
    publicKey : serverConfig.IMAGEKIT_PUBLIC_KEY,
    privateKey : serverConfig.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : serverConfig.IMAGEKIT_URL
});

export default imagekit;