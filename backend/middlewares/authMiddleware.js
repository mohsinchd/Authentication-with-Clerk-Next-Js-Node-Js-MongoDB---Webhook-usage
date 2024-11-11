import { ErrorHandler } from "../utils/index.js";

export const legacyRequireAuth = (req, res, next) => {
  if (!req.auth.userId) {
    return next(new ErrorHandler("Unauthenticated", 401));
  }
  next();
};
