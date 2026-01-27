
export const handleError = (error) => {
  console.error('API Error:', error);


  if (error.name === 'ValidationError') {
    return {
      status: 400,
      body: {
        success: false,
        message: 'Validation Error',
        errors: Object.values(error.errors).map((e) => e.message),
      },
    };
  }


  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    return {
      status: 400,
      body: {
        success: false,
        message: `${field} already exists`,
      },
    };
  }


  if (error.name === 'CastError') {
    return {
      status: 400,
      body: {
        success: false,
        message: 'Invalid ID format',
      },
    };
  }


  return {
    status: error.statusCode || 500,
    body: {
      success: false,
      message: error.message || 'Internal Server Error',
    },
  };
};

export default handleError;
