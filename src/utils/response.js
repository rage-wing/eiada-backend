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
      status: 'unauthorized',
      message: extra || 'you are not authorized',
      error: '🥞',
    },
    404: {
      code: 404,
      status: 'not found',
      message: `this ${extra || 'page'} is not found`,
      error: '🥞',
    },
    500: {
      code: 500,
      status: 'server error',
      message: extra || 'we are sorry! unexpected error happened',
      error: '🥞',
    },
  };

  return this.status(code).json(responses[code]);
};
