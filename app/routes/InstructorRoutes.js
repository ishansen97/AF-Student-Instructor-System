const express = require('express');
const app = express();

const AssignmentDetailsController = require('../Node.Controller/AssignmentDetailsController');
const ExamController = require('../Node.Controller/ExamController');
const MaterialController = require('../Node.Controller/MaterialConroller');
const NoticeController = require('../Node.Controller/NoticeController');
const ResultsController = require('../Node.Controller/ResultsController');

app.use('/assignments' , AssignmentDetailsController);
app.use('/exams' ,ExamController);
app.use('/materials' ,MaterialController);
app.use('/notices' ,NoticeController);
app.use('/results' ,ResultsController);

module.exports = app;