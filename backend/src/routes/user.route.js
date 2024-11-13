import { Router } from "express";
import { getAllUsers, getMessages } from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const userRouter = Router();

// userRouter.get("/", (req, res) => {
//   res.send("User Route with GET method");
// });

userRouter.get("/", protectRoute, getAllUsers);
userRouter.get("/messages/:userId", protectRoute, getMessages);

export default userRouter;
