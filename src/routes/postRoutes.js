const router = require('express').Router();
const PostHandler = require('./../handler/post');
const uploadFile = require('./../utils/multer');

router.route('').post(uploadFile.single('media'), PostHandler.handleCreateNewPost);
module.exports = router;
