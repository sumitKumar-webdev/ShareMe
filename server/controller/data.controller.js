import { File } from "../model/File.model.js";
import { redis } from "../config/redis.js";
import cryptoRandomString from "crypto-random-string";
import archiver from "archiver"
import axios from "axios";

export const upload = async (req, res, next) => {
    try {
        const { text } = req.body;
        const files = req.files;
        if (!text && files.length === 0) {
            return res.status(400).json({ message: "No data to upload", status: false });
        }

        console.log(files);


        const fileList = files.map(file => ({
            originalName: file.originalname,
            url: file.path,
            mimetype: file.mimetype,
            size: file.size,
            public_id: file.filename,
        }));

        let key = cryptoRandomString({ length: 4, type: 'numeric' });
        while (await redis.get(key)) {
            key = cryptoRandomString({ length: 4, type: 'numeric' });
        }

        await File.create({ text, code: key, files: fileList })
        redis.setex(key, process.env.expireTime, JSON.stringify({ text, files: fileList }));
        res.status(201).json({ message: "Data uploaded successfully", status: true, key });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const fetch = async (req, res) => {
    try {
        const { key } = req.params;
        if (!key) return res.status(400).json({ message: "Key is required", status: false });

        const data = await redis.get(key);
        if (!data) return res.status(404).json({ message: "Data not found or expired", status: false });

        const { text, files } = JSON.parse(data)

        res.status(200).json({ message: "Data fetched successfully", status: true, data: { text, files } });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const downloadAll = async (req, res) => {
    try {
        const { key } = req.params;
        if (!key) return res.status(400).json({ message: "Key is required", status: false });

        const data = await redis.get(key);
        if (!data) return res.status(404).json({ message: "Data not found or expired", status: false });

        const { files } = JSON.parse(data);

        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", "attachment; filename=\"shareMe-files.zip\"");

        const archive = archiver("zip", { zlib: { level: 9 } });
        archive.pipe(res);

        for (const file of files) {
            try {
                const response = await axios.get(file.url, { responseType: "arraybuffer" });
                archive.append(response.data, { name: file.originalName });
            } catch (err) {
                console.error("Download failed for:", file.url);
            }
        }

        archive.finalize();
    } catch (error) {
        console.error("ZIP error:", error);
        res.status(500).json({ message: "Could not download files", status: false });
    }
};


export default { upload, fetch, downloadAll };