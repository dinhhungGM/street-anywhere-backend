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
    name: 'Comment',
    description: 'API for comments in the system',
  },
  paths: {
    '/comments/{id}': {
      get: {
        tags: ['Comment'],
        summary: 'Get comments by id',
        parameters: [
          {
            name: 'id',
            description: 'The comments id',
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
                    categoryName: {
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
            description: 'Not found comments',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
      patch: {
        tags: ['Comment'],
        summary: 'Update comments',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The comments id',
            required: true,
            type: 'number',
          },
          {
            name: 'payload',
            in: 'body',
            description: 'The new comments name',
            required: true,
            type: 'object',
            schema: {
              type: 'object',
              properties: {
                categoryName: {
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
            description: 'Bad request. Maybe the comment id or payload is invalid',
            schema: errorResponse,
          },
          404: {
            description: 'Not found comment',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
      delete: {
        tags: ['Comment'],
        summary: 'Delete comment by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The comment id',
            type: 'number',
            required: true,
          },
        ],
        responses: {
          204: {
            description: 'Delete comment successfully',
          },
          400: {
            description: 'Bad request. Maybe the id is invalid',
            schema: errorResponse,
          },
          404: {
            description: 'Not found comment',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/comments': {
      get: {
        tags: ['Comment'],
        summary: 'Get comments',
        responses: {
          200: {
            description: 'Get comments successfully',
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
                      categoryName: {
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
        tags: ['Comment'],
        summary: 'Create a new category',
        parameters: [
          {
            name: 'payload',
            in: 'body',
            description: 'The information of category',
            required: true,
            schema: {
              type: 'object',
              properties: {
                categoryName: {
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
