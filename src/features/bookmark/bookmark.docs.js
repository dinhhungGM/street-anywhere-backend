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
    name: 'Bookmark',
    description: 'API for bookmark in the system',
  },
  paths: {
    '/bookmarks/user/{userId}': {
      get: {
        tags: ['Bookmark'],
        summary: 'Get all bookmark of user',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            description: 'The user id',
            required: true,
            type: 'number',
          },
        ],
        responses: {
          200: {
            description: 'Get bookmark of user',
            schema: {
              type: 'object',
              properties: {
                bookmarkCount: {
                  type: 'number',
                },
                posts: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'number',
                      },
                      title: {
                        type: 'string',
                      },
                      location: {
                        type: 'string',
                      },
                      longitude: {
                        type: 'number',
                      },
                      latitude: {
                        type: 'number',
                      },
                      type: {
                        type: 'string',
                      },
                      size: {
                        type: 'number',
                      },
                      shortTitle: {
                        type: 'string',
                      },
                      description: {
                        type: 'string',
                      },
                      videoYtbUrl: {
                        type: 'string',
                      },
                      views: {
                        type: 'number',
                      },
                      tags: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },
                      categories: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },
                      bookmarks: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'number',
                            },
                            userId: {
                              type: 'number',
                            },
                            postId: {
                              type: 'number',
                            },
                          },
                        },
                      },
                      imageUrl: {
                        type: 'string',
                      },
                      reactionCount: {
                        type: 'number',
                      },
                      commentCount: {
                        type: 'number',
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request. Maybe the userId is invalid',
            schema: errorResponse,
          },
          404: {
            description: 'Not found user',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/bookmarks/post/{postId}': {
      get: {
        tags: ['Bookmark'],
        summary: 'Get all bookmark of post by postId',
        parameters: [
          {
            name: 'postId',
            in: 'path',
            description: 'The post id',
            required: true,
            type: 'number',
          },
        ],
        responses: {
          200: {
            description: 'Get bookmark of post successfully',
            schema: {
              type: 'object',
              properties: {
                bookmarkCount: {
                  type: 'number',
                },
                bookmarkDetails: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      bookmarkId: {
                        type: 'number',
                      },
                      userId: {
                        type: 'number',
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
            description: 'Not found your post',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/bookmarks/{bookmarkId}': {
      delete: {
        tags: ['Bookmark'],
        summary: ['Bookmark a post'],
        parameters: [
          {
            name: 'bookmarkId',
            in: 'path',
            description: 'The bookmark id',
            required: true,
            type: 'number',
          },
        ],
        responses: {
          204: {
            description: 'Delete a bookmark successfully',
          },
          400: {
            description: 'Bad request. Maybe the bookmarkId is invalid',
            schema: errorResponse,
          },
          404: {
            description: 'Not found bookmark',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/bookmarks': {
      post: {
        tags: ['Bookmark'],
        summary: ['Bookmark a post'],
        parameters: [
          {
            name: 'Payload',
            in: 'body',
            description: 'Bookmark payload',
            required: true,
            schema: {
              type: 'object',
              properties: {
                userId: {
                  type: 'number',
                },
                postId: {
                  type: 'number',
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Add post to bookmark successfully',
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
            description: 'Bad request. Maybe the payload is invalid',
            schema: errorResponse,
          },
          404: {
            description: 'Not found post or user',
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
