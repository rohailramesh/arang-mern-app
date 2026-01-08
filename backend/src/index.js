import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import cors from "cors";
dotenv.config();
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import adminRouter from "./routes/admin.route.js";
import songRouter from "./routes/song.route.js";
import albumRouter from "./routes/album.route.js";
import statRouter from "./routes/stat.route.js";
import { initializeSocket } from "./lib/socket.js";
import cron from "node-cron";
import { createServer } from "http";
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5001;
const httpServer = createServer(app);
initializeSocket(httpServer);
app.use(
  cors({
    origin: "https://arang-mern-app.vercel.app",
    credentials: true,
  })
);
app.use(express.json()); //use for parsing request body to json - middleware
app.use(clerkMiddleware()); //add auth to req object to check if authenticated to do specific function or not
app.get("/api/ping", (req, res) => {
  res.status(200).json({
    message: "pong",
    status: "alive",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "/tmp"),
    createParentPath: true, //create parent path if not exists
    limits: {
      fileSize: 1000 * 1024 * 1024, //1000mb limit
    },
  })
);

// cron jobs to delete temp files when new song or album is created
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.log("error", err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (err) => {});
      }
    });
  }
});

//Eg: app.use("/api/users", userRoutes)
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/songs", songRouter);
app.use("/api/albums", albumRouter);
app.use("/api/stats", statRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});
httpServer.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
