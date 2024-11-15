import { Router } from "express";
import { authCallback } from "../controller/auth.controller.js";
const authRouter = Router();
// authRouter.get("/", (req, res) => {
//   res.send("Auth Route with GET method");
// });

authRouter.post("/callback", authCallback);

export default authRouter;
