require('dotenv').config();
const express = require('express');
const http = require('http');

const app = express();

const modeEnv = process.env.NODE_ENV || 'development';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
