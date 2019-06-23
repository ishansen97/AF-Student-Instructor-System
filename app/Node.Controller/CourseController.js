const express = require('express');
const router = express.Router();
const CoursesRepo = require('../Node.Repository/CourseRepo');


router.get('/get-courses' , (req,res,next) =>{
    CoursesRepo.getCourses().then((courses)=>{
        res.status(courses.status).send(courses.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

router.get('/get-courses/:id' , (req,res,next) =>{
    const params = req.params;
    CoursesRepo.getCoursesById(params.code).then((course)=>{
        res.status(course.status).send(course.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});



module.exports = router;