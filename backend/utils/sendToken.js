export const sendToken = (res, user, message, statusCode = 200) => {
  const token = user.getJWTToken();

  res.status(statusCode).json({
    success: true,
    message,
    user,
    token,
  });
};
