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
    name: 'Categories',
    description: 'API for categories in the system',
  },
  paths: {
    '/categories/{id}': {
      get: {
        tags: ['Categories'],
        summary: 'Get category by id',
        parameters: [
          {
            name: 'id',
            description: 'The category id',
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
            description: 'Not found category',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
      patch: {
        tags: ['Categories'],
        summary: 'Update category',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The category id',
            required: true,
            type: 'number',
          },
          {
            name: 'payload',
            in: 'body',
            description: 'The new category name',
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
            description: 'Bad request. Maybe the category id or payload is invalid',
            schema: errorResponse,
          },
          404: {
            description: 'Not found category',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
      delete: {
        tags: ['Categories'],
        summary: 'Delete category by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The category id',
            type: 'number',
            required: true,
          },
        ],
        responses: {
          204: {
            description: 'Delete category successfully',
          },
          400: {
            description: 'Bad request. Maybe the id is invalid',
            schema: errorResponse,
          },
          404: {
            description: 'Not found category',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/categories': {
      get: {
        tags: ['Categories'],
        summary: 'Get categories',
        responses: {
          200: {
            description: 'Get categories successfully',
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
        tags: ['Categories'],
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
