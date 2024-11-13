import { Router } from "express";
import { createSong } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
const adminRouter = Router();

adminRouter.get("/", protectRoute, requireAdmin, createSong); // will check if user is logged in and also an admin before accessing this route and controller

export default adminRouter;
