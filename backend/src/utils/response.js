/**
 * Consistent response formatter for API
 */
export const response = {
  success: (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  error: (res, message = 'An error occurred', statusCode = 500, code = 'ERROR') => {
    return res.status(statusCode).json({
      success: false,
      message,
      code,
      error: true,
    });
  },

  created: (res, data, message = 'Resource created successfully') => {
    return response.success(res, data, message, 201);
  },

  noContent: (res, message = 'Resource deleted successfully') => {
    return res.status(204).json({
      success: true,
      message,
    });
  },

  badRequest: (res, message = 'Bad request') => {
    return response.error(res, message, 400, 'BAD_REQUEST');
  },

  unauthorized: (res, message = 'Unauthorized') => {
    return response.error(res, message, 401, 'UNAUTHORIZED');
  },

  forbidden: (res, message = 'Forbidden') => {
    return response.error(res, message, 403, 'FORBIDDEN');
  },

  notFound: (res, message = 'Resource not found') => {
    return response.error(res, message, 404, 'NOT_FOUND');
  },

  conflict: (res, message = 'Resource already exists') => {
    return response.error(res, message, 409, 'CONFLICT');
  },
};
