import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
dotenv.config();
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import adminRouter from "./routes/admin.route.js";
import songRouter from "./routes/song.route.js";
import albumRouter from "./routes/album.route.js";
import statRouter from "./routes/stat.route.js";
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json()); //use for parsing request body to json - middleware
//Various user routes to add here which will route user to specific link
app.use(clerkMiddleware()); //add auth to req object to check if authenticated to do specific function or not
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "/tmp"),
    createParentPath: true, //create parent path if not exists
    limits: {
      fileSize: 10 * 1024 * 1024, //10mb limit
    },
  })
);
//Eg: app.use("/api/users", userRoutes)
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/songs", songRouter);
app.use("/api/albums", albumRouter);
app.use("/api/stats", statRouter);
app.use((req, res, next, err) => {
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
    });
}); //if env mode is production, it will show first message to user else it will show error to developer to fix
app.listen(PORT, () => {
  console.log("Server is running on port123 " + PORT);
  connectDB();
});
