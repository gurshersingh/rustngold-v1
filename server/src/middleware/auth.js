const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/AppError');

/**
 * Verify JWT from httpOnly cookie.
 * Attaches { userId, role } to req.user.
 */
function authenticate(req, res, next) {
  const token = req.cookies.auth_token;

  if (!token) {
    return next(AppError.unauthorized('Authentication required'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    next();
  } catch (err) {
    res.clearCookie('auth_token');
    if (err.name === 'TokenExpiredError') {
      return next(AppError.unauthorized('Session expired. Please log in again.'));
    }
    return next(AppError.unauthorized('Invalid authentication token'));
  }
}

module.exports = { authenticate };
