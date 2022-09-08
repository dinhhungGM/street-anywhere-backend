const { Op } = require('sequelize');
const catchAsync = require('./../utils/catchAsync');
const helper = require('./../utils/helper');
const { category: Category } = require('./../models');

module.exports = {
  createNewCategory: catchAsync(async (req, res) => {
    const { categoryName } = req.body;
    const existedCategories = await Category.findAll({
      raw: true,
      where: {
        categoryName: {
          [Op.iLike]: categoryName,
        },
      },
    });
    if (existedCategories.length) {
      throw helper.createError(400, 'Category was existed. Please choose another category');
    }
    await Category.create({ categoryName });
    return res.status(201).json({
      status: 'Success',
      message: 'Create a new category successfully',
    });
  }),
};
