import express from "express";
import upload from "../middleware/multer.js";
import { addvideo } from "../controllers/onlinevideo.controller.js";

const videoRouter = express.Router();

videoRouter.post("/add/:id", upload.single("file"), addvideo);

export default videoRouter;
