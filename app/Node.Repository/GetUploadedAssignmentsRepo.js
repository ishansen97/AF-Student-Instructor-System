
const mongoose = require('../Node.Schema/InstructorSchema');
const assignmentUploadModel = mongoose.model('assignment_upload');

const AssignmentUploadRepo = function () {

    this.get_uploaded_assignment = () => {
        return new Promise((resolve, reject) => {
            assignmentUploadModel.find().then(data => {
                resolve({status:200, message:data})
            }).catch( err => {
                reject({status:500, message:err})
            })
        })
    };
};

module.exports = new AssignmentUploadRepo();
