const { AppError } = require('../utils/AppError');

/**
 * Role-based access control middleware.
 * Must be used AFTER authenticate middleware.
 *
 * Usage: requireRole('admin', 'manager')
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(AppError.unauthorized('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(AppError.forbidden(
        `This action requires one of the following roles: ${allowedRoles.join(', ')}`
      ));
    }

    next();
  };
}

module.exports = { requireRole };
