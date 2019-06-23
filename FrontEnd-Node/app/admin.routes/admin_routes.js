const express = require('express');
const app = express();
const AdminController = require('../admin.controller/AdminController');
const SpecializationController = require('../admin.controller/SpecializationController');
const FacultyController = require('../admin.controller/FacultyController');
const InstructorController = require('../admin.controller/InstructorController');
const MailController = require('../admin.controller/EmailController');

app.use('/admin/', AdminController);
app.use('/specialization/', SpecializationController);
app.use('/faculty/', FacultyController);
app.use('/instructor/', InstructorController);
app.use('/email/', MailController);

module.exports = app;