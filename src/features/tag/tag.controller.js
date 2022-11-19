const catchAsync = require('./../../utils/catchAsync');
const helper = require('./../../utils/helper');
const { tag: Tag } = require('./../../models');
const { Op } = require('sequelize');

module.exports = {
  createNewTag: catchAsync(async (req, res) => {
    const { tagName } = req.body;
    const existedTags = await Tag.findAll({
      raw: true,
      where: {
        tagName: {
          [Op.iLike]: tagName,
        },
      },
    });
    if (existedTags.length) {
      throw helper.createError(400, 'Tag was existed. Please choose another tag');
    }
    const newTag = await Tag.create({ tagName });
    return res.status(201).json({
      status: 'Success',
      message: 'Create a new tag successfully',
      value: newTag,
    });
  }),

  getTags: catchAsync(async (req, res) => {
    const tags = await Tag.findAll({ raw: true });
    return res.status(200).json({
      status: 'Success',
      value: tags,
    });
  }),

  getTagById: catchAsync(async (req, res) => {
    const { id } = req.params;
    const findingTag = await Tag.findByPk(+id);
    if (!findingTag) {
      throw helper.createError(404, 'No tags found');
    }
    return res.status(200).json({
      status: 'Success',
      value: findingTag,
    });
  }),

  updateTag: catchAsync(async (req, res) => {
    const { id } = req.params;
    const { tagName } = req.body;
    const [findingTag, existedTags] = await Promise.all([
      Tag.findByPk(+id),
      Tag.findAll({
        raw: true,
        where: {
          id: {
            [Op.ne]: id,
          },
          tagName: {
            [Op.iLike]: `%${tagName}%`,
          },
        },
      }),
    ]);
    if (!findingTag) {
      throw helper.createError(404, 'No tags found');
    }
    if (existedTags.length) {
      throw helper.createError(400, 'Your tag name you wanna update was exist. Please choose another one');
    }
    await findingTag.update({ tagName });
    return res.status(200).json({
      status: 'Success',
      message: 'Update successfully',
    });
  }),

  deleteTag: catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedCount = await Tag.destroy({
      where: {
        id,
      },
    });
    if (!deletedCount) {
      throw helper.createError(404, 'No tags found');
    }
    return res.status(204).end();
  }),
};
