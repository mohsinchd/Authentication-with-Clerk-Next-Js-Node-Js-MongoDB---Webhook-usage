import { asyncHandler, ErrorHandler } from "../utils/index.js";
import { User } from "../models/index.js";

export const getDetails = asyncHandler(async (req, res, next) => {
  const auth = req.auth;

  const user = await User.findOne({ clerkId: auth.userId });

  if (!user) return next(new ErrorHandler("User not exists", 404));

  res.status(200).json({ success: true, user });
});

export const createUser = asyncHandler(async (req, res, next) => {
  const user = req.body;

  const newUser = await User.create({
    name: user.name,
    clerkId: user.clerkId,
    imageUrl: user.imageUrl,
    email: user.email,
  });

  res.status(200).json({
    success: true,
    message: "created",
    newUser,
  });
});
