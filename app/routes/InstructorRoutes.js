const express = require('express');
const app = express();

const AssignmentDetailsController = require('../Node.Controller/AssignmentDetailsController');
const ExamController = require('../Node.Controller/ExamController');
const MaterialController = require('../Node.Controller/MaterialConroller');
const NoticeController = require('../Node.Controller/NoticeController');
const ResultsController = require('../Node.Controller/ResultsController');

const GetStudentDetailsController = require('../Node.Controller/GetStudentDetailsContoller');
const assignmentUploadController = require('../Node.Controller/GetUploadedAssignmentsController');

const CoursesController = require('../Node.Controller/CourseController');
const SpecializationController = require('../Node.Controller/SpecializationController');

app.use('/assignments' , AssignmentDetailsController);
app.use('/exams' ,ExamController);
app.use('/materials' ,MaterialController);
app.use('/notices' ,NoticeController);
app.use('/results' ,ResultsController);
app.use('/courses' , CoursesController);
app.use('/special' , SpecializationController);
app.use('./getStudent' , GetStudentDetailsController);
app.use('./getUploadedAssignments' , assignmentUploadController);

module.exports = app;