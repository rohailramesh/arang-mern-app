import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - you must be logged in" });
  }
  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
    console.log(isAdmin);
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized - you must be an admin" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// import { clerkClient } from "@clerk/express";
// /* This will check different things like if the user is authenticated to perform a function and if they are an admin. Based on that, they will be able to access certain routes and the controllers related to them */

// export const protectRoute = async (req, res, next) => {
//   try {
//     if (!req.auth.userId) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized - Please login" });
//     }
//     next(); // so if user is authenticated, next middleware will be called which would be a controller
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const requireAdmin = async (req, res, next) => {
//   try {
//     const currentUser = await clerkClient.users.getUser(req.auth.userId);
//     const isAdmin =
//       process.env.ADMIN_EMAIl === currentUser.primaryEmailAddress?.emailAddress;
//     console.log(currentUser.primaryEmailAddress?.emailAddress);
//     if (!isAdmin) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized - You are not an admin",
//       });
//     }
//     next(); // so if user is an admin, next middleware will be called which would be a controller to access admin routes assuming user is an authenticated user too
//   } catch (error) {
//     console.log(error);
//   }
// };
