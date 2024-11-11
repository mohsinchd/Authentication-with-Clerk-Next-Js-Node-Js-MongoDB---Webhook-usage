import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  clerkId: {
    required: true,
    type: String,
  },
  imageUrl: String,
});

export const User = mongoose.model("User", userSchema);
