import { Router } from "express";
const songRouter = Router();
songRouter.get("/", (req, res) => {
  res.send("Song Route with GET method");
});

export default songRouter;
