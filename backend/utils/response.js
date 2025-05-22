const successResponse = (res, message, data, statusCode = 200) => {
  return res.status(statusCode).json({
    message,
    data,
  });
};

export { successResponse };
