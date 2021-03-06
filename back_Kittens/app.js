var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var indexRouter = require('./routes/index');
var ownerRouter = require('./routes/owners');

var companiesROuter = require('./routes/companies');
var favoriteRouter = require('./routes/favorites');

var app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/owners', ownerRouter);
app.use('/companies', companiesROuter);
app.use('/favorites', favoriteRouter);

module.exports = app;
