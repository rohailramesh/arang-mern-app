import { Router } from "express";
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
const adminRouter = Router();
adminRouter.use(protectRoute, requireAdmin); //will check if user is logged in and also an admin before accessing this route and controller
adminRouter.get("/check", checkAdmin);

adminRouter.post("/songs", createSong);
adminRouter.delete("/songs/:id", deleteSong);

adminRouter.post("/albums", createAlbum);
adminRouter.delete("/albums/:id", deleteAlbum);

export default adminRouter;
