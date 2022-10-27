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
    name: 'Tags',
    description: 'API for tags in the system',
  },
  paths: {
    '/tags/{id}': {
      get: {
        tags: ['Tags'],
        summary: 'Get tag by id',
        parameters: [
          {
            name: 'id',
            description: 'The tags id',
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
                    tagName: {
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
            description: 'Not found tags',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
      patch: {
        tags: ['Tags'],
        summary: 'Update tag',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The tag id',
            required: true,
            type: 'number',
          },
          {
            name: 'payload',
            in: 'body',
            description: 'The new tag name',
            required: true,
            schema: {
              type: 'object',
              properties: {
                tagName: {
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
            description: 'Bad request. Maybe the tag id or payload is invalid',
            schema: errorResponse,
          },
          404: {
            description: 'Not found tag',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
      delete: {
        tags: ['Tags'],
        summary: 'Delete tag by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The tag id',
            type: 'number',
            required: true,
          },
        ],
        responses: {
          204: {
            description: 'Delete tag successfully',
          },
          400: {
            description: 'Bad request. Maybe the id is invalid',
            schema: errorResponse,
          },
          404: {
            description: 'Not found tag',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/tags': {
      get: {
        tags: ['Tags'],
        summary: 'Get tags',
        responses: {
          200: {
            description: 'Get tags successfully',
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
                      tagName: {
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
        tags: ['Tags'],
        summary: 'Create a new tag',
        parameters: [
          {
            name: 'payload',
            in: 'body',
            description: 'The information of tag',
            required: true,
            schema: {
              type: 'object',
              properties: {
                tagName: {
                  type: 'string',
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Create successfully',
            schema: errorResponse,
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
