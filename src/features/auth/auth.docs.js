const errorResponse = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
  },
};

module.exports = {
  tag: {
    name: 'Authentication',
    description: 'API for authentication in the system',
  },
  paths: {
    '/auth/sign-in': {
      post: {
        tags: ['Authentication'],
        summary: 'Sign in to the system',
        parameters: [
          {
            name: 'Payload',
            in: 'body',
            description: 'The account information includes username and password',
            required: true,
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Sign in successfully',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  description: 'The status of response',
                },
                value: {
                  type: 'object',
                  description: 'The information of user',
                  properties: {
                    id: {
                      type: 'number',
                    },
                    fullName: {
                      type: 'string',
                    },
                    username: {
                      type: 'string',
                    },
                    firstName: {
                      type: 'string',
                    },
                    lastName: {
                      type: 'string',
                    },
                    profilePhotoUrl: {
                      type: 'string',
                    },
                    bio: {
                      type: 'string',
                    },
                    role: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'number',
                        },
                        roleName: {
                          type: 'string',
                        },
                      },
                    },
                    rank: {
                      type: 'string',
                    },
                    isAdmin: {
                      type: 'boolean',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request. Maybe your information you provide is invalid',
            schema: errorResponse,
          },
          403: {
            description: 'Sign in failed. Maybe your username or password is incorrect',
            schema: errorResponse,
          },
          404: {
            description: 'Sign in failed. Your account does not exist in database',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/auth/sign-up': {
      post: {
        tags: ['Authentication'],
        summary: 'Sign up for the system',
        parameters: [
          {
            name: 'Payload',
            in: 'body',
            description: 'The account information includes: username, password, firstName, lastName',
            required: true,
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
                firstName: {
                  type: 'string',
                },
                lastName: {
                  type: 'string',
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Sign up successfully',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  description: 'The status of response',
                },
                value: {
                  type: 'object',
                  description: 'The information of user',
                  properties: {
                    id: {
                      type: 'number',
                    },
                    fullName: {
                      type: 'string',
                    },
                    username: {
                      type: 'string',
                    },
                    firstName: {
                      type: 'string',
                    },
                    lastName: {
                      type: 'string',
                    },
                    profilePhotoUrl: {
                      type: 'string',
                    },
                    bio: {
                      type: 'string',
                    },
                    role: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'number',
                        },
                        roleName: {
                          type: 'string',
                        },
                      },
                    },
                    isAdmin: {
                      type: 'boolean',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request. Maybe your information you provide is invalid',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
  },
};
