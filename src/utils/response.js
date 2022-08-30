module.exports = function send(code, payload, extra) {
  const responses = {
    200: {
      code: 200,
      status: 'success',
      message: extra || 'operation completed successfully',
      payload,
    },
    201: {
      code: 201,
      status: 'created',
      message: `${extra} created successfully`,
      payload,
    },
    403: {
      code: 403,
      error: '🥞',
      status: 'unauthorized',
      message: payload || 'you are not authorized',
    },
    404: {
      code: 404,
      error: '🥞',
      status: 'not found',
      message: payload || `this ${extra || 'page'} is not found`,
    },
    409: {
      code: 409,
      error: '🥞',
      status: 'conflict',
      message: payload || `this ${extra} is conflicting with other records`,
    },
    500: {
      code: 500,
      error: '🥞',
      status: 'server error',
      message: payload || 'we are sorry! unexpected error happened',
    },
  };

  return this.status(code).json(
    responses[code] || {
      code,
      payload: payload,
      message: extra,
    }
  );
};
