const { AppError } = require('../utils/AppError');

/**
 * Zod validation middleware.
 * Validates req.body, req.query, or req.params against a Zod schema.
 *
 * Usage:
 *   validate(myZodSchema)             → validates req.body
 *   validate(myZodSchema, 'query')    → validates req.query
 *   validate(myZodSchema, 'params')   → validates req.params
 */
function validate(schema, source = 'body') {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      return next(
        new AppError(
          `Validation failed: ${errors.map((e) => `${e.field} - ${e.message}`).join('; ')}`,
          400,
          'VALIDATION_ERROR'
        )
      );
    }

    // Replace with parsed/cleaned data
    req[source] = result.data;
    next();
  };
}

module.exports = { validate };
