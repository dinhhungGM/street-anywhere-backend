const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const apiDocsConfig = require('./api-doc.config');

router.use('', swaggerUi.serve, swaggerUi.setup(apiDocsConfig, { customSiteTitle: 'Street AnyWhere API' }));
module.exports = router;
