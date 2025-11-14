import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { upload } from "../middleware/multer.js";

const authRouter = express.Router();

authRouter.post("/user/register", upload.single("file"), register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
