import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        default: ""
    },
    files: [
        {
            fileUrl: { type: String, default: null },
            fileName: { type: String, default: null },
            fileType: { type: String, default: null }
        }
    ],
    expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
        index: { expires: 0 },
    },
}, { timestamps: true })

export const File = mongoose.model("File", FileSchema); 