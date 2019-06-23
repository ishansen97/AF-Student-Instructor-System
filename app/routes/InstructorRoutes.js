const express = require('express');
const app = express();

const AssignmentDetailsController = require('../Node.Controller/AssignmentDetailsController');
const ExamController = require('../Node.Controller/ExamController');
const MaterialController = require('../Node.Controller/MaterialConroller');
const NoticeController = require('../Node.Controller/NoticeController');
const ResultsController = require('../Node.Controller/ResultsController');

const CoursesController = require('../Node.Controller/CourseController');
const SpecializationController = require('../Node.Controller/SpecializationController')

app.use('/assignments' , AssignmentDetailsController);
app.use('/exams' ,ExamController);
app.use('/materials' ,MaterialController);
app.use('/notices' ,NoticeController);
app.use('/results' ,ResultsController);
app.use('/courses' , CoursesController);
app.use('/special' , SpecializationController);

module.exports = app;