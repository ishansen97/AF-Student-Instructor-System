const express = require('express');
const Bundler = require('parcel-bundler');
const courseRoute = require('./CourseBackEnd/course.Routes/CourseRoute');

const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

const app = express();

const bundler = new Bundler('./CourseFrountEnd/src/index.html', {});

app.use(express.json());

app.use(express.static('./dist'));

app.use('/api/resources/', courseRoute);       // Always put the api before the bundler.middleware()

app.use(bundler.middleware());

app.use('/', (req, res, next) => {
    res.sendfile('./dist/index.html');

});

//app.use(express.json());

//==============================Backend operations =======================================//



// const routes = require('./CourseBackEnd/course.Routes/CourseRoute');
//
// app.use('/api', routes);




app.listen(4000, err => {
    if(err) {
        console.error(err);
        return;
    }
    console.log('running on port 4000');
});