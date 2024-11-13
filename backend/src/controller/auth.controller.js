import { User } from "../models/user.model.js";
/*
Call back function that creates user if their id does not exists in mongodb
*/
export const authCallBack = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    const userExists = await User.findOne({ clerkId: id });
    if (!userExists) {
      await User.create({
        clerkId: id,
        fullName: `${firstName || ""} ${lastName || ""}`.trim(),
        imageUrl,
      });
    }
    res.status((200).json({ success: true }));
  } catch (error) {
    console.log(error);
    // next(error)
  }
};
