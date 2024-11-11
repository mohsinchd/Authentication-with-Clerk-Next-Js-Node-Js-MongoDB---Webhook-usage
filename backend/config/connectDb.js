import mongoose from "mongoose";
import { DATABASE_CONNECTION } from "../constants/index.js";

export const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "users_test",
  });
  console.log(DATABASE_CONNECTION(connection.host));
};
