export const errorHandler = {
  getMessage: (error) => {
    if (!error) return 'An unknown error occurred';
    
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    
    if (error.message) {
      return error.message;
    }
    
    return 'An unexpected error occurred';
  },

  getFieldErrors: (error) => {
    if (error.response?.data?.errors) {
      return error.response.data.errors;
    }
    return {};
  },

  isNetworkError: (error) => {
    return !error.response && error.message === 'Network Error';
  },

  isUnauthorized: (error) => {
    return error.response?.status === 401;
  },

  isForbidden: (error) => {
    return error.response?.status === 403;
  },

  isNotFound: (error) => {
    return error.response?.status === 404;
  },

  isValidationError: (error) => {
    return error.response?.status === 422;
  },

  isServerError: (error) => {
    return error.response?.status >= 500;
  },
};