import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } }); //find all the users but not including current user
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const myId = req.auth.userId;
    const { userId } = req.params;
    const messages = await Message.find({
      //find all the messages between the two users
      $or: [
        //or condition to find all the messages between the two users
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 }); // -1 = Descending => newest -> oldest 1 = Ascending => oldest -> newest
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
