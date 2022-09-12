const router = require('express').Router();
const PostHandler = require('./../handler/post');
const uploadFile = require('./../utils/multer');

router.route('').get(PostHandler.getAllPosts).post(uploadFile.single('media'), PostHandler.handleCreateNewPost);
module.exports = router;
