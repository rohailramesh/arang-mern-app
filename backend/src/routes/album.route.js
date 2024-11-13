import { Router } from "express";
const albumRouter = Router();
albumRouter.get("/", (req, res) => {
  res.send("Album Route with GET Method");
});

export default albumRouter;
