import express from "express";
import { addvideo } from "../controllers/onlinevideo.controller.js";
import uploadlarge from "../middleware/largefile.js";

const videoRouter = express.Router();

videoRouter.post("/add/:id", uploadlarge.single("file"), addvideo);

export default videoRouter;
