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
    name: 'Reactions',
    description: 'API for reactions in the system',
  },
  paths: {
    '/reactions/{id}': {
      get: {
        tags: ['Reactions'],
        summary: 'Get reaction by id',
        parameters: [
          {
            name: 'id',
            description: 'The reactions id',
            in: 'path',
            required: true,
            type: 'number',
          },
        ],
        responses: {
          200: {
            description: 'Fetch successfully',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                },
                value: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'number',
                    },
                    reactionType: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request. Maybe the id is invalid',
            schema: errorResponse,
          },
          404: {
            description: 'Not found reactions',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
      patch: {
        tags: ['Reactions'],
        summary: 'Update reactions',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The reaction id',
            required: true,
            type: 'number',
          },
          {
            name: 'payload',
            in: 'body',
            description: 'The new reaction name',
            required: true,
            type: 'object',
            schema: {
              type: 'object',
              properties: {
                reactionType: {
                  type: 'string',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Update successfully',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                },
                message: {
                  type: 'string',
                },
              },
            },
          },
          400: {
            description: 'Bad request. Maybe the reaction id or payload is invalid',
            schema: errorResponse,
          },
          404: {
            description: 'Not found reaction',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
      delete: {
        tags: ['Reactions'],
        summary: 'Delete reaction by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The reaction id',
            type: 'number',
            required: true,
          },
        ],
        responses: {
          204: {
            description: 'Delete reaction successfully',
          },
          400: {
            description: 'Bad request. Maybe the id is invalid',
            schema: errorResponse,
          },
          404: {
            description: 'Not found reaction',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/reactions': {
      get: {
        tags: ['Reactions'],
        summary: 'Get reactions',
        responses: {
          200: {
            description: 'Get reactions successfully',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                },
                value: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'number',
                      },
                      reactionType: {
                        type: 'string',
                      },
                      icon: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
      post: {
        tags: ['Reactions'],
        summary: 'Create a new reaction',
        parameters: [
          {
            name: 'payload',
            in: 'body',
            description: 'The information of reaction',
            required: true,
            schema: {
              type: 'object',
              properties: {
                reactionType: {
                  type: 'string',
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Create successfully',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                },
                message: {
                  type: 'string',
                },
              },
            },
            400: {
              description: 'Bad request. Maybe your payload is invalid',
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
  },
};
