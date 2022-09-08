const multer = require('multer');
const memoryStorage = multer.memoryStorage();

const uploadFile = multer({
  storage: memoryStorage,
});

module.exports = uploadFile;
