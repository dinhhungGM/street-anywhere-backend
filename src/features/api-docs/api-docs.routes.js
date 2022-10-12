const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
router.use('', swaggerUi.serve);
module.exports = router;
