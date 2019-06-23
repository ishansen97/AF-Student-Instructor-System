const mongoose = require('../studentSchema/studentSchema');
mongoose.set('useFindAndModify', false);
const studentModel = mongoose.model('student_login');

const StudentRepo = function () {

    this.addNewStudentId = (student) => {
        const newStudent = new studentModel({
            studentID: student.studentID,
            studentUserName: "",
            studentPassword: ""
        });
        return new Promise( (resolve, reject) => {
            newStudent.save().then( () => {
                resolve({status:200, message: "new student id added"})
            }).catch( err=>{
                reject({status:500, message:err})
            })
        })
    };
    this.addNewStudentLoginDetails = (student) => {
        return new Promise( (resolve, reject) => {
            studentModel.findOneAndUpdate(
                {
                    studentID:student.studentID
                },
                {
                    studentUserName: student.studentUserName,
                    studentPassword: student.studentPassword
                }
            ).then( () => {
                resolve({status:200, message: "updated"})
            }).catch( err=>{
                reject({status:500, message:err})
            })
        })
    };
    this.getStudentId = (studentId) => {
        return new Promise((resolve, reject) => {
            studentModel.find({studentID: studentId}).then( data =>{
                resolve({status:200, message:data})
            }).catch( err=>{
                reject({status:404, message:err})
            })
        })
    };
    this.getStudentByUsername = (username) => {
        return new Promise((resolve, reject) => {
            studentModel.find({studentUserName: username}).then( data =>{
                resolve({status:200, message:data})
            }).catch( err=>{
                reject({status:404, message:err})
            })
        })
    };
};

module.exports = new StudentRepo();