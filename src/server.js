require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const createRoutes = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/static', express.static(path.resolve(__dirname, 'public')));
createRoutes(app);

module.exports = http.createServer(app);
