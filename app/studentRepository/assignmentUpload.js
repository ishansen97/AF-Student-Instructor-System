const mongoose = require('../studentSchema/studentSchema');
mongoose.set('useFindAndModify', false);
const assignmentUploadModel = mongoose.model('assignment_upload');
// ObjectId = require('mongodb').ObjectID;
const { ObjectId } = require('mongoose').Types;

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
    this.edit_assignment = (studentID, assID, assignment) => {
        return new Promise((resolve, reject) => {
            assignmentUploadModel.findOneAndUpdate(
                {
                    studentID: studentID,
                    assignmentID: assID
                },
                {
                    uploadFile: assignment
                },
                {new: true, runValidators: true}
            ).then( () => {
                resolve({status:200, message: "updated"})
            }).catch( err=>{
                reject({status:500, message:err})
            })
        })
    };
    this.uploadAssignment = (assignment, studentID, assignmentID) => {
        const newAssignmentUpload = new assignmentUploadModel({
            studentID: studentID,
            uploadFile: assignment,
            assignmentID: assignmentID
        });
        return new Promise((resolve, reject) => {
            newAssignmentUpload.save().then((data) => {
                resolve({status:200, message:data._id})
            }).catch( err => {
                reject({status:500, message:err})
            })
        })
    };
    this.updateAssignment = (id, assignment) => {
        return new Promise((resolve, reject) => {
            assignmentUploadModel.findOneAndUpdate(
                {
                    _id: ObjectId(id)
                },
                {
                    studentID:assignment.studentID,
                    assignmentID:assignment.assignmentID
                },
                {new: true, runValidators: true}
            ).then( () => {
                resolve({status:200, message: "updated"})
            }).catch( err=>{
                reject({status:500, message:err})
            })
        })
    }
};

module.exports = new AssignmentUploadRepo();