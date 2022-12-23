const catchAsync = require('./../../utils/catchAsync');
const models = require('./../../models');
const _ = require('lodash');
const stringUtils = require('./../../utils/string');
const { Op } = require('sequelize');

module.exports = {
  calculateDataOfUser: catchAsync(async (req, res, next) => {
    const [results] = await models.sequelize.query(
      `
      SELECT 
        COUNT(*) AS "totalUsers", 
        EXTRACT(MONTH FROM u."createdAt") AS "month",  
        EXTRACT(YEAR FROM u."createdAt") AS "year"
      FROM USERS u
      GROUP BY "month", "year"
      ORDER BY "month"
      `,
    );
    let responseValues = {};
    if (_.isEmpty(results) || _.isNil(results)) {
      responseValues = [];
    } else {
      const groupValues = _.groupBy(results, 'year');
      for (const year in groupValues) {
        responseValues[year] = {
          totalUsers: _.reduce(
            groupValues[year],
            (total, data) => {
              return total + parseInt(data.totalUsers);
            },
            0,
          ),
          details: _.map(groupValues[year], (data) => {
            return {
              count: +data.totalUsers,
              month: +data.month,
            };
          }),
        };
      }
    }
    return res.status(200).json({
      status: 'Success',
      value: responseValues,
    });
  }),
  calculateDataOfPost: catchAsync(async (req, res, next) => {
    const [results] = await models.sequelize.query(
      `
      SELECT 
        COUNT(*) AS "totalPosts", 
        EXTRACT(MONTH FROM p."createdAt") AS "month",  
        EXTRACT(YEAR FROM p."createdAt") AS "year"
      FROM POSTS p
      GROUP BY "month", "year"
      ORDER BY "month"
      `,
    );
    let responseValues = {};
    if (_.isEmpty(results) || _.isNil(results)) {
      responseValues = [];
    } else {
      const groupValues = _.groupBy(results, 'year');
      for (const year in groupValues) {
        responseValues[year] = {
          totalPosts: _.reduce(
            groupValues[year],
            (total, data) => {
              return total + parseInt(data.totalPosts);
            },
            0,
          ),
          details: _.map(groupValues[year], (data) => {
            return {
              count: +data.totalPosts,
              month: +data.month,
            };
          }),
        };
      }
    }
    return res.status(200).json({
      status: 'Success',
      value: responseValues,
    });
  }),
  getTopUsersByViewCount: catchAsync(async (req, res, next) => {
    const [results] = await models.sequelize.query(
      `
      SELECT u.id, u."firstName", u."lastName", u."profilePhotoUrl", COUNT(p."id") as "postCount",  SUM(p."views") as "viewCount" 
      FROM users u JOIN posts p ON u.id = p."userId"
      GROUP BY u.id, u."firstName", u."lastName", u."profilePhotoUrl"
      ORDER BY "viewCount" DESC
      `,
    );
    const responseValues = _.map(results, (data) => {
      const { id, firstName, lastName, ...rest } = data;
      return {
        userId: +id,
        fullName: _.startCase(_.toLower(`${ data.firstName.trim() } ${ data.lastName.trim() }`)),
        ...rest,
      };
    });
    return res.status(200).json({
      status: 'Success',
      value: responseValues,
    });
  }),
  getTopUsersByFollowerCount: catchAsync(async (req, res) => {
    const [results] = await models.sequelize.query(
      `
      SELECT
        u."firstName",
        u."lastName",
        u."profilePhotoUrl",
        u."id",
        COUNT(f."userId") as "totalFollower"
      FROM
        followers f,
        users u
      WHERE
        f."followerId" = u.id
      GROUP BY
        u."firstName",
        u."lastName",
        u."id",
        u."profilePhotoUrl"
      ORDER BY
        "totalFollower" DESC
      LIMIT
        10
      `,
    );
    const responseValues = _.map(results, (user) => {
      const { firstName, lastName, totalFollower, ...rest } = user;
      return {
        ...rest,
        totalFollower: +totalFollower,
        fullName: stringUtils.getFullName(user),
      };
    });
    return res.status(200).json({
      status: '200: Ok',
      message: 'Handling get top user by follower count successfully',
      value: responseValues,
    });
  }),
  getTopUserWithTheMostPosts: catchAsync(async (req, res) => {
    const [results] = await models.sequelize.query(
      `
      SELECT
        u.id,
        u."firstName",
        u."lastName",
        u."profilePhotoUrl",
        COUNT (p.id) AS "totalPost"
      FROM
        users u
        JOIN posts p ON u.id = p."userId"
      GROUP BY
        u.id,
        u."firstName",
        u."lastName",
        u."profilePhotoUrl"
      ORDER BY
        "totalPost" DESC
      LIMIT
        10
      `,
    );
    const responseValues = _.map(results, (user) => {
      const { firstName, lastName, totalPost, ...rest } = user;
      return {
        ...rest,
        totalPost: +totalPost,
        fullName: stringUtils.getFullName(user),
      };
    });
    return res.status(200).json({
      status: '200: Ok',
      message: 'Handling get top user with the most posts successfully',
      value: responseValues,
    });
  }),
  getAllStatsInfoOfSys: catchAsync(async (req, res) => {
    const [totalUsers, totalPosts, totalImages, totalVideos, totalReactionIcons, totalCategories] =
      await Promise.all([
        models.user.count(),
        models.post.count(),
        models.post.count({
          where: {
            type: 'video',
          },
        }),
        models.post.count({
          where: {
            type: {
              [Op.iLike]: '%image%',
            },
          },
        }),
        models.reaction.count(),
        models.category.count(),
      ]);
    return res.status(200).json({
      status: '200: Ok',
      message: 'Handling get stats info of sys successfully',
      value: {
        totalUsers,
        totalPosts,
        totalImages,
        totalVideos,
        totalReactionIcons,
        totalCategories,
      },
    });
  }),
};
