const catchAsync = require('./../utils/catchAsync');
const helper = require('./../utils/helper');
const { mediaSource: MediaSource } = require('./../models');

module.exports = {
  getMedia: catchAsync(async (req, res) => {
    const { id } = req.params;
    const mediaSource = await MediaSource.findByPk(+id);
    if (!mediaSource) {
      throw helper.createError(404, 'No media source found');
    }
    return res.header('Content-Type', 'image/jpeg').status(200).send(mediaSource.sources);
  }),
};
