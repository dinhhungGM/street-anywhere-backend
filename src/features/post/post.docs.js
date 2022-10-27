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
const successResponse = {
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
  userId: {
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
  createdAt: {
    type: 'string',
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
  user: {
    type: 'object',
    properties: {
      userId: {
        type: 'number',
      },
      fullName: {
        type: 'string',
      },
      profilePhotoUrl: {
        type: 'string',
      },
    },
  },
  imageUrl: {
    type: 'string',
  },
  reactionCount: {
    type: 'number',
  },
  bookmarkCount: {
    type: 'number',
  },
  commentCount: {
    type: 'number',
  },
};
module.exports = {
  tag: {
    name: 'Post',
    description: 'API for posts in the system',
  },
  paths: {
    '/posts/reactions': {
      get: {
        tags: ['Post'],
        summary: 'Get posts by reaction',
        responses: {
          200: {
            description: 'Fetch successfully',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: successResponse,
              },
            },
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/posts/shorts': {
      get: {
        tags: ['Post'],
        summary: 'Get shorts',
        responses: {
          200: {
            description: 'Fetch successfully',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: successResponse,
              },
            },
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/posts/tops': {
      get: {
        tags: ['Post'],
        summary: 'Get top posts',
        responses: {
          200: {
            description: 'Fetch successfully',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: successResponse,
              },
            },
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/posts/addView/{postId}': {
      patch: {
        tags: ['Post'],
        summary: 'Increment view of post by 1',
        parameters: [
          {
            name: 'postId',
            in: 'path',
            description: 'The post ID',
            required: true,
            type: 'number',
          },
        ],
        responses: {
          204: {
            description: 'Successfully',
          },
          400: {
            description: 'Bad request',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/posts/user/{userId}': {
      get: {
        tags: ['Post'],
        summary: 'Get all posts of user',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            description: 'The user ID',
            required: true,
            type: 'number',
          },
        ],
        responses: {
          200: {
            description: 'Fetch successfully',
            schema: successResponse,
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
    '/posts/media/{postId}': {
      get: {
        tags: ['Post'],
        summary: 'Get image by post id',
        parameters: [
          {
            name: 'postId',
            in: 'path',
            description: 'The post ID',
            required: true,
            type: 'number',
          },
        ],
        responses: {
          200: {
            description: 'Fetch successfully',
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
    '/posts/{postId}': {
      get: {
        tags: ['Post'],
        summary: 'Get post by postId',
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
            description: 'Fetch successfully',
            schema: {
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
                userId: {
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
                createdAt: {
                  type: 'string',
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
                user: {
                  type: 'object',
                  properties: {
                    userId: {
                      type: 'number',
                    },
                    fullName: {
                      type: 'string',
                    },
                    profilePhotoUrl: {
                      type: 'string',
                    },
                  },
                },
                imageUrl: {
                  type: 'string',
                },
                reactions: {
                  type: 'object',
                  properties: {
                    '[reactionType]': {
                      type: 'object',
                      properties: {
                        reactionId: {
                          type: 'number',
                        },
                        count: {
                          type: 'number',
                        },
                        users: {
                          type: 'array',
                          items: {
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
    // '/posts': {
    //   post: {
    //     tags: ['Post'],
    //     summary: 'Create a new post',
    //     consumes: ['multipart/form-data'],
    //     parameters: [
    //       {
    //         name: 'title',
    //         in: 'formData',
    //         required: true,
    //         description: 'The title of post',
    //         type: 'string',
    //       },
    //       {
    //         name: 'shortTitle',
    //         in: 'formData',
    //         required: true,
    //         description: 'The short title of post',
    //         type: 'string',
    //       },
    //       {
    //         name: 'tags',
    //         in: 'formData',
    //         required: true,
    //         description: 'The tags of post',
    //         type: 'array',
    //         items: {
    //           type: 'number',
    //         },
    //       },
    //       {
    //         name: 'categories',
    //         in: 'formData',
    //         required: true,
    //         description: 'The categories of post',
    //         type: 'array',
    //         items: {
    //           type: 'number',
    //         },
    //       },
    //       {
    //         name: 'location',
    //         in: 'formData',
    //         required: true,
    //         description: 'The location of post',
    //         type: 'string',
    //       },
    //       {
    //         name: 'longitude',
    //         in: 'formData',
    //         required: true,
    //         description: 'The longitude of post',
    //         type: 'string',
    //       },
    //       {
    //         name: 'latitude',
    //         in: 'formData',
    //         required: true,
    //         description: 'The latitude of post',
    //         type: 'string',
    //       },
    //       {
    //         name: 'type',
    //         in: 'formData',
    //         description: 'The type of post',
    //         required: true,
    //         type: 'string',
    //         enum: ['image', 'video'],
    //       },
    //       {
    //         name: 'videoYtbUrl',
    //         in: 'formData',
    //         type: 'string',
    //         required: false,
    //         description: 'The youtube link',
    //       },
    //       {
    //         name: 'media',
    //         in: 'formData',
    //         type: 'file',
    //         description: 'Upload image file',
    //       },
    //     ],
    //     responses: {
    //       201: {
    //         description: 'Create successfully',
    //       },
    //       400: {
    //         description: 'Bad request',
    //         schema: errorResponse,
    //       },
    //       500: {
    //         description: 'Bad request',
    //         schema: errorResponse,
    //       },
    //     },
    //   },
    // },
  },
};
