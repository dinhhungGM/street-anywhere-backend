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
  getCategories: catchAsync(async (req, res) => {
    const categories = await Category.findAll({ raw: true });
    return res.status(200).json({
      status: 'Success',
      value: categories,
    });
  }),
  getCategoryById: catchAsync(async (req, res) => {
    const { id } = req.params;
    const findingCategory = await Category.findByPk(+id);
    if (!findingCategory) {
      throw helper.createError(404, 'No categories found');
    }
    return res.status(200).json({
      status: 'Success',
      value: findingCategory,
    });
  }),
  updateCategory: catchAsync(async (req, res) => {
    const { id } = req.params;
    const { categoryName } = req.body;
    const [findingCategory, existedCategories] = await Promise.all([
      Category.findByPk(+id),
      Category.findAll({
        raw: true,
        where: {
          id: {
            [Op.ne]: id,
          },
          categoryName: {
            [Op.iLike]: categoryName,
          },
        },
      }),
    ]);
    if (!findingCategory) {
      throw helper.createError(404, 'No categories found');
    }
    if (existedCategories.length) {
      throw helper.createError(400, 'Your category name you wanna update was exist. Please choose another one');
    }
    await findingCategory.update({ categoryName });
    await findingCategory.save();
    return res.status(200).json({
      status: 'Success',
      message: 'Update successfully',
    });
  }),
  deleteCategory: catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedCount = await Category.destroy({
      where: {
        id,
      },
    });
    if (!deletedCount) {
      throw helper.createError(404, 'No categories found');
    }
    return res.status(204).end();
  }),
};
