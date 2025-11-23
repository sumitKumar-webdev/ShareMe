import express from "express";
import { upload, fetch, downloadAll } from "../controller/data.controller.js";
import { uploadToCloud } from "../config/CloudStorage.js";

const router = express.Router();

router.post("/upload", uploadToCloud.array("files", 5), upload);
router.post("/get/:key", fetch);
router.get("/download-all/:key", downloadAll);

export default router;