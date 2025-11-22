import express from "express";
import { upload, fetch } from "../controller/data.controller.js";
import { uploadToCloud } from "../config/CloudStorage.js";

const router = express.Router();

router.post("/upload", uploadToCloud.array("files", 10), upload);
router.post("/get/:key", fetch);

export default router;