import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./config/mongo.js";
import authRouter from "./routes/auth.route.js";
import adminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.route.js";
import eventRouter from "./routes/event.route.js";
import videoRouter from "./routes/onlinevideo.route.js";
import testRouter from "./routes/test.route.js";

//server setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const port = process.env.port;

//api end points
app.get("/", (req, res) => {
  res.send("fitness app 2.0");
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);
app.use("/api/video", videoRouter);
app.use("/api", testRouter);

db()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to DB—exiting:", error.message);
    process.exit(1);
  });
