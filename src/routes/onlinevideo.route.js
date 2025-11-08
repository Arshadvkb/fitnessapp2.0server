import express from "express";
import {
  addvideo,
  deletevideo,
  editvideo,
  viewvideo,
} from "../controllers/onlinevideo.controller.js";
import upload from "../middleware/multer.js";

const videoRouter = express.Router();

videoRouter.post("/add/:id", upload.single("file"), addvideo);
videoRouter.get("/view", viewvideo);
videoRouter.put("/edit/:id", upload.single("file"), editvideo);
videoRouter.delete("/delete/:id", deletevideo);

export default videoRouter;
