const mongoose = require('../Node.Schema/InstructorSchema');
const courseSchema = mongoose.model('courses');

const CoursesRepo = function () {

    this.getCourses = () => {
        return new Promise((resolve, reject) => {
            courseSchema.find().exec().then((data) => {
                resolve({status: 200, courses: data});
            }).catch(err => {
                reject({status: 500, message: err});
            })
        })
    };


    this.getCoursesById = (course) => {
        return new Promise((resolve, reject) => {
            courseSchema.find({_id: course}).populate('course').then((data) => {
                resolve({status: 200, notice: data});
            }).catch(err => {
                reject({status: 500, message: err});
            })
        })
    };
};


module.exports = new CoursesRepo();