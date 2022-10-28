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
    '/reactions/post/{postId}': {
      get: {
        tags: ['Reactions'],
        summary: 'Get all reaction of post',
        parameters: [
          {
            name: 'postId',
            description: 'The post ID',
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
                    reactionCountAll: {
                      type: 'number',
                    },
                    reactionDetails: {
                      type: 'object',
                      properties: {
                        '[reactionType]': {
                          type: 'object',
                          properties: {
                            count: {
                              type: 'number',
                            },
                            users: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  userId: {
                                    type: 'number',
                                  },
                                  fullName: {
                                    type: 'number',
                                  },
                                  postReactionId: {
                                    type: 'number',
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            schema: errorResponse,
          },
          404: {
            description: 'Not found',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
      post: {
        tags: ['Reactions'],
        summary: 'Add reaction',
        parameters: [
          {
            name: 'postId',
            description: 'The post ID',
            in: 'path',
            required: true,
            type: 'number',
          },
          {
            name: 'payload',
            description: 'Payload',
            in: 'body',
            required: true,
            type: 'object',
            properties: {
              postId: {
                type: 'number',
              },
              userId: {
                type: 'number',
              },
              reactionId: {
                type: 'number',
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Add reaction successfully',
            schema: errorResponse,
          },
          400: {
            description: 'Bad request',
            schema: errorResponse,
          },
          404: {
            description: 'Not found',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/reactions/{postReactionId}': {
      patch: {
        tags: ['Reactions'],
        summary: 'Update reaction',
        parameters: [
          {
            name: 'postReactionId',
            in: 'path',
            description: 'The Post Reaction ID',
            required: true,
            type: 'number',
          },
          {
            name: 'payload',
            in: 'body',
            description: 'The new reaction id',
            required: true,
            type: 'object',
            properties: {
              reactionId: {
                type: 'number',
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Update successfully',
            schema: errorResponse,
          },
          400: {
            description: 'Bad request',
            schema: errorResponse,
          },
          404: {
            description: 'Not found',
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
        summary: 'Delete post reaction',
        parameters: [
          {
            name: 'postReactionId',
            in: 'path',
            description: 'The Post Reaction ID',
            required: true,
            type: 'number',
          },
        ],
        responses: {
          204: {
            description: 'Delete successfully',
          },
          400: {
            description: 'Bad request',
            schema: errorResponse,
          },
          404: {
            description: 'Not found',
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
