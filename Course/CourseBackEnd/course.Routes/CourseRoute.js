const express = require('express');

const app = express();

const CourseController = require('../course.Controller/CourseController');

app.use('/course/', CourseController);



module.exports = app;