import { Router } from "express";
const authRouter = Router();
authRouter.get("/", (req, res) => {
  res.send("Auth Route with GET method");
});

export default authRouter;
