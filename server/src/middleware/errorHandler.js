const { logger } = require('../utils/logger');
const { AppError } = require('../utils/AppError');

function errorHandler(err, req, res, _next) {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let code = err.code || 'INTERNAL_ERROR';

  // Prisma known errors
  if (err.code === 'P2002') {
    statusCode = 409;
    message = 'A record with this value already exists';
    code = 'DUPLICATE_ENTRY';
  } else if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Record not found';
    code = 'NOT_FOUND';
  }

  // Log error (full stack for 500s, message only for operational errors)
  if (statusCode >= 500) {
    logger.error({ err, req: { method: req.method, url: req.url } }, message);
  } else {
    logger.warn({ statusCode, code, url: req.url }, message);
  }

  // Don't leak error details in production for 500s
  if (statusCode >= 500 && process.env.NODE_ENV === 'production') {
    message = 'Internal server error';
  }

  res.status(statusCode).json({
    error: message,
    code,
    ...(process.env.NODE_ENV === 'development' && statusCode >= 500
      ? { stack: err.stack }
      : {}),
  });
}

module.exports = { errorHandler };
