var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
const apiPostsRouter = require('./routes/api-posts');
const apiCommentsRouter = require('./routes/api-comments');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors({
    origin: 'http://localhost:3001'
}));

// good naming nomenclature with the version numbers, that way if you come out with a version two
// the users still refering to v1 won't break their apps.
app.use('/api/v1/posts', apiPostsRouter);
app.use('/api/v1/comments', apiCommentsRouter);

module.exports = app