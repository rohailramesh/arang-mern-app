import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stat.controller.js";
const statRouter = Router();
// statRouter.get("/", (req, res) => {
//   res.send("Stat route with GET method");
// });

statRouter.get("/", protectRoute, requireAdmin, getStats);
export default statRouter;
