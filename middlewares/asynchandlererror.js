const handleAsyncError = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    })
  }
}
module.exports = handleAsyncError
