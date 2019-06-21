const express = require('express');

const router = express.Router();

const CourseRepository = require('../course.Repository/CourseRepository');

router.get('/get-course/:name', (req, res, next) => {
    const params = req.params.name;
    CourseRepository.getOneCourse(params).then((course) => {
        res.status(course.status).send(course.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});


router.get('/get-all-courses', (req, res, next) => {
    CourseRepository.getAllCourses().then((courses) => {
        res.status(courses.status).send(courses.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-all-course-specs', (req, res, next) => {
    CourseRepository.getAllCourseSpecs().then((courses) => {
        res.status(courses.status).send(courses.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.post('/add-course', (req,res,next) => {
    const body = req.body;
    CourseRepository.insertCourse(body).then((data) => {
        res.status(data.status).send(" Course is Added : " + data.message)
    }).catch(err => {
        res.status(err.status).send(" Course cannot be added... " + err.message)
    })
});

router.put('/update-course/:name', (req, res, next) => {
    const body = req.body;
    CourseRepository.updateCourse(body).then((data) => {
        res.status(data.status).send(" Course has been Updated.. " + data.message)
    }).catch(err => {
        res.status(err.status).send(" Course cannot be updated" + err.message)
    })
});

router.delete('/delete-course/:name', (req, res, next) =>  {

    CourseRepository.deleteCourse().then((data) => {
        res.status(data.status).send(" Course has been deleted..." + data.message)
    }).catch(err => {
        res.status(err.status).send(" Course cannot delete ...." + err.message)
    })
});


module.exports = router;