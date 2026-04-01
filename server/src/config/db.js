import mongoose from "mongoose";

let isConnected = false;
let cachedPromise = null;

const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  cachedPromise = mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "ecommerceDB",
    })
    .then((mongooseInstance) => {
      isConnected = true;
      console.log("MongoDB connected:", mongooseInstance.connection.host);
      return mongooseInstance.connection;
    })
    .catch((error) => {
      cachedPromise = null;
      console.error("MongoDB connection failed:", error.message);
      throw error;
    });

  return cachedPromise;
};

export default connectDB;
