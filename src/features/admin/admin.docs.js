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

const adminUserIdParam = {
  name: 'adminUserId',
  in: 'query',
  description: 'The User ID who has admin role',
  required: true,
};

module.exports = {
  tag: {
    name: 'Admin',
    description: 'API for admin in the system',
  },
  paths: {
    '/admin/users/{userId}': {
      delete: {
        tags: ['Admin'],
        summary: 'Using admin role to delete user',
        parameters: [
          adminUserIdParam,
          {
            name: 'userId',
            in: 'path',
            description: 'The user id you wanna delete',
            required: true,
            type: 'number',
          },
        ],
        responses: {
          204: {
            description: 'Delete user successfully',
          },
          400: {
            description: 'Bad request. Invalid parameters',
            schema: errorResponse,
          },
          404: {
            description: 'Not found user',
            schema: errorResponse,
          },
          403: {
            description: 'Forbidden. Your role is denied',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/admin/users': {
      get: {
        tags: ['Admin'],
        summary: 'Get all users in the system',
        parameters: [adminUserIdParam],
        responses: {
          200: {
            description: 'Get all users successfully',
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
                      roleId: {
                        type: 'number',
                      },
                      rankId: {
                        type: 'number',
                      },
                      role: {
                        type: 'string',
                      },
                      isAdmin: {
                        type: 'boolean',
                      },
                      postCount: {
                        type: 'number',
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request. Maybe your adminUserId is invalid',
            schema: errorResponse,
          },
          403: {
            description: 'Forbidden. Your role is denied',
            schema: errorResponse,
          },
          404: {
            description: 'Not found admin user',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
      post: {
        tags: ['Admin'],
        summary: 'Using admin role to create new user',
        parameters: [
          adminUserIdParam,
          {
            name: 'payload',
            in: 'body',
            description: 'The information of account',
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
                roleId: {
                  type: 'number',
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Create new user successfully',
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
            description: 'Bad request. Invalid parameters',
            schema: errorResponse,
          },
          403: {
            description: 'Forbidden. Your role is denied',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/admin/roles': {
      get: {
        tags: ['Admin'],
        summary: 'Get all roles in the system',
        parameters: [adminUserIdParam],
        responses: {
          200: {
            description: 'Get all roles successfully',
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
                      roleName: {
                        type: 'string',
                      },
                      users: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'number',
                            },
                            fullName: {
                              type: 'number',
                            },
                            firstName: {
                              type: 'number',
                            },
                            lastName: {
                              type: 'number',
                            },
                            profilePhotoUrl: {
                              type: 'string',
                            },
                            rankId: {
                              type: 'number',
                            },
                          },
                        },
                      },
                      numberOfUsers: {
                        type: 'number',
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request. Maybe your adminUserId is invalid',
            schema: errorResponse,
          },
          403: {
            description: 'Forbidden. Your role is denied',
            schema: errorResponse,
          },
          404: {
            description: 'Not found admin user',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/admin/reactions': {
      get: {
        tags: ['Admin'],
        summary: 'Get all reactions in the system',
        parameters: [adminUserIdParam],
        responses: {
          200: {
            description: 'Get all reactions successfully',
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
                      numberOfUses: {
                        type: 'number',
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request. Maybe your adminUserId is invalid',
            schema: errorResponse,
          },
          403: {
            description: 'Forbidden. Your role is denied',
            schema: errorResponse,
          },
          404: {
            description: 'Not found admin user',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/admin/categories': {
      get: {
        tags: ['Admin'],
        summary: 'Get all categories in the system',
        parameters: [adminUserIdParam],
        responses: {
          200: {
            description: 'Get all categories successfully',
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
                      numberOfUses: {
                        type: 'number',
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request. Maybe your adminUserId is invalid',
            schema: errorResponse,
          },
          403: {
            description: 'Forbidden. Your role is denied',
            schema: errorResponse,
          },
          404: {
            description: 'Not found admin user',
            schema: errorResponse,
          },
          500: {
            description: 'Internal error server',
            schema: errorResponse,
          },
        },
      },
    },
    '/admin/tags': {
      get: {
        tags: ['Admin'],
        summary: 'Get all hash tags in the system',
        parameters: [adminUserIdParam],
        responses: {
          200: {
            description: 'Get all hash tags successfully',
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                },
                tagName: {
                  type: 'string',
                },
                numberOfUses: {
                  type: 'number',
                },
              },
            },
          },
          400: {
            description: 'Bad request. Maybe your adminUserId is invalid',
            schema: errorResponse,
          },
          403: {
            description: 'Forbidden. Your role is denied',
            schema: errorResponse,
          },
          404: {
            description: 'Not found admin user',
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
