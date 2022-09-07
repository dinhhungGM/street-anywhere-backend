require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');

const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

module.exports = http.createServer(app);