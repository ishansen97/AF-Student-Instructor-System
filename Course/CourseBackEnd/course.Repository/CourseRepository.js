const mongoose = require('../course.Schema/CourseSchema');

const express = require('express');

const CourseModel = mongoose.model('Course');

// const router = express.Router();

const CourseRepo = function () {

    this.insertCourse = (course) => {
        return new Promise((resolve, reject) => {
            const newCourse = new CourseModel({                 //newCourse is object of the CoueseModel in the Schema
                courseName: course.courseName,
                year: course.year,
                semester: course.semester,
                // faculty: course.faculty,
                specialize: course.specialize,
                courseHead: course.courseHead,
                enrollmentKey: course.enrollmentKey,
                credits: parseInt(course.credits)
            });

            newCourse.save().then( () => {
                resolve({status: 201, message: "Course is Added. "})
            }).catch(err => {
                reject({status: 500, message: "Error :" + err})
            })

        })
    };

    //==================================Update and Delete functions are not working.==========================//


    this.updateCourse = (courseName, data) => {

        return new Promise((resolve, reject) => {





            CourseModel.update({courseName: courseName}, data).then((data) => {
                resolve({status: 200, message: "Course has been Updated" + data})
            }).catch(err => {
                reject({status: 500, message: " Can't Update Course " + err})
            })
        })
    };

    this.deleteCourse = (courseName) => {
        return new Promise((resolve, reject) => {
            CourseModel.remove({courseName:courseName}).then((data) => {
                resolve({status: 200, message: "Course has been removed.." + data})
            }).catch(err => {
                reject({status: 404, message: "Can not found Course..." + err})
            })
        })
    };

    //==============================================================================//


    this.getAllCourses = () => {
        return new Promise((resolve, reject) => {
            CourseModel.find().exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: err})
            })
        })
    };

    this.getAllCourseSpecs = () => {
        return new Promise((resolve, reject) => {
            CourseModel.find().populate('specialize').exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: err})
            })
        })
    };

    this.getOneCourse = (courseName) => {
        return new  Promise((resolve, reject) => {
            CourseModel.findOne({courseName: courseName}).then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "Can't find Course.... " + err})
            })
        })
    };

};

//---------------------------------------------------------------------------------------------------//

// //Update the course details
// router.route("/update/:courseName").put(function(req, res) {
//     const param = req.body;
//     CourseModel.findById(req.params.id, function(err, coursemodel) {
//         if (!coursemodel) res.status(404).send("Data is not found");
//
//         else //coursemodel.courseName = param.courseName;
//         coursemodel.year = param.year;
//         coursemodel.semester = param.semester;
//         coursemodel.faculty = param.year;
//         coursemodel.specialize = param.specialize;
//         coursemodel.courseHead = param.courseHead;
//         coursemodel.enrollmentKey = param.enrollmentKey;
//         coursemodel.credits = param.credits;
//
//         coursemodel
//             .save()
//             .then(coursemodel => {
//                 res.json("Course Updated");
//             })
//             .catch(err => {
//                 res.status(400).send("Update not possible");
//             });
//     });
// });

//--------------------------------------------------------------------------------------------------------------//

// // Delete the course
//
// router.route("/delete/:courseName").delete(function(req, res) {
//     CourseModel.findOneAndDelete({ _courseName: req.params.courseName }, function(
//         err,
//         coursemodel
//     ) {
//         if (err){
//             res.json(" Can not remove. " + err);
//         }
//         else res.json(" Successfully removed ");
//     });
// });


//-------------------------------------------------------------------------------------------------------------//

module.exports = new CourseRepo();


// module.exports = router;