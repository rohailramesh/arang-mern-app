import mongoose from "mongoose";
export const connectDB = async () => {
  // If a cached connection exists, return it
  let cached = global.mongoose || { conn: null, promise: null };
  global.mongoose = cached;
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  // If no promise is in progress, create a new connection promise
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      dbName: "spotify-mern-app",
      bufferCommands: false, // Disable buffering for stability
    });
  }
  // Wait for the connection to resolve and cache it
  cached.conn = await cached.promise;
  console.log("Connected to MongoDB");

  return cached.conn;
};

// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.log(error);
//     process.exit(1); // 1 for failure 0 for success
//   }
// };
