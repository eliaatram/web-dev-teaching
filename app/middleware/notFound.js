module.exports = (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  res.status(err.status).json({
    error: {
      message: err.message,
    },
  });
};
