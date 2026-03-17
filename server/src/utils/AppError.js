class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || 'INTERNAL_ERROR';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, code) {
    return new AppError(message, 400, code || 'BAD_REQUEST');
  }

  static unauthorized(message) {
    return new AppError(message || 'Not authenticated', 401, 'UNAUTHORIZED');
  }

  static forbidden(message) {
    return new AppError(message || 'Insufficient permissions', 403, 'FORBIDDEN');
  }

  static notFound(message) {
    return new AppError(message || 'Resource not found', 404, 'NOT_FOUND');
  }

  static conflict(message) {
    return new AppError(message, 409, 'CONFLICT');
  }
}

module.exports = { AppError };
