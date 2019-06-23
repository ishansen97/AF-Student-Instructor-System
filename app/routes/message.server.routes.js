const express = require('express');
const app =express();
const studentDetailsController = require('../studentController/studentController');
// const Router = express.Router();

// Router.get('/', function (req, res) {
//     res.json({message: 'Welcome to the react + express + mongoDB'});
// });
app.use("/student", studentDetailsController);

module.exports = app;
