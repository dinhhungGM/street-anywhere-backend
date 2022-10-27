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
    '/comments/post/{postId}': {
      get: {
        tags: ['Comment'],
        summary: 'Get comments by postId',
        parameters: [
          {
            name: 'postId',
            description: 'The post id',
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
                    status: {
                      type: 'string',
                    },
                    message: {
                      type: 'string',
                    },
                    value: {
                      type: 'object',
                      properties: {
                        commentCount: {
                          type: 'number',
                        },
                        commentList: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              id: {
                                type: 'number',
                              },
                              content: {
                                type: 'string',
                              },
                              postId: {
                                type: 'number',
                              },
                              userId: {
                                type: 'number',
                              },
                              createdAt: {
                                type: 'string',
                              },
                              updatedAt: {
                                type: 'string',
                              },
                              user: {
                                type: 'object',
                                properties: {
                                  fullName: {
                                    type: 'string',
                                  },
                                  profilePhotoUrl: {
                                    type: 'string',
                                  },
                                  rankId: {
                                    type: 'number',
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
            description: 'Bad request. Maybe the postId is invalid',
            schema: errorResponse,
          },
          404: {
            description: 'Not found post by postId',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
      post: {
        tags: ['Comment'],
        summary: 'Create a new comment',
        parameters: [
          {
            name: 'postId',
            description: 'The post id',
            in: 'path',
            required: true,
            type: 'number',
          },
          {
            name: 'payload',
            description: 'The content of comment',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                postId: {
                  type: 'number',
                },
                userId: {
                  type: 'number',
                },
                content: {
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
          },
          400: {
            description: 'Bad request',
            schema: errorResponse,
          },
          404: {
            description: 'Not found post',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/comments/{commentId}': {
      patch: {
        tags: ['Comment'],
        summary: 'Update comments',
        parameters: [
          {
            name: 'commentId',
            in: 'path',
            description: 'The comment id',
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
                content: {
                  type: 'string',
                },
              },
            },
          },
        ],
        responses: {
          204: {
            description: 'Update successfully',
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
            name: 'commentId',
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
  },
};
