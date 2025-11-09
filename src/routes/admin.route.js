import express from "express";
import {
  addTrainer,
  delete_trainer,
  view_trainer,
} from "../controllers/admin.controller.js";
import { upload } from "../middleware/multer.js";

const adminRouter = express.Router();

adminRouter.post("/add-trainer", upload.single("file"), addTrainer);
adminRouter.get("/view_trainer", view_trainer);
adminRouter.delete("/delete_trainer/:id", delete_trainer);

export default adminRouter;
