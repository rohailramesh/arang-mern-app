import { Router } from "express";
const statRouter = Router();
statRouter.get("/", (req, res) => {
  res.send("Stat route with GET method");
});
export default statRouter;
