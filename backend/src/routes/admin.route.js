import { Router } from "express";
const adminRouter = Router();
adminRouter.get("/", (req, res) => {
  res.send("Admin Route with GET method");
});

export default adminRouter;
