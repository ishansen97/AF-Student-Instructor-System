const mongoose = require('../Node.Schema/InstructorSchema');
const studentDetailsSchema = mongoose.model('student_details');

const getStudentDetailsRepo = function () {

    this.getStudentEmail = () => {
        return new Promise((resolve, reject) => {
            studentDetailsSchema.find().exec().then((data) => {
                resolve({status: 200, results: data});
            }).catch(err => {
                reject({status: 500, message: err});
            })
        })
    };
};
module.exports = new getStudentDetailsRepo();
