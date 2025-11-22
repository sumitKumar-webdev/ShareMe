import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "shareMe",
        resource_type: "auto",
    }
})

export const uploadToCloud = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });