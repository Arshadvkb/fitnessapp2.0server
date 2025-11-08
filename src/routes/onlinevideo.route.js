import express from "express";
import { addvideo, viewvideo } from "../controllers/onlinevideo.controller.js";
import upload from "../middleware/multer.js";

const videoRouter = express.Router();

videoRouter.post("/add/:id", upload.single("file"), addvideo);
videoRouter.get("/view", viewvideo);

export default videoRouter;
