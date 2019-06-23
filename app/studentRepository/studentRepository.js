const mongoose = require('../studentSchema/studentSchema');
const studentDetailsModel = mongoose.model('student_details');
// const imageUploade = mongoose.model('image_upload');

const StudentDetailsRepo = function () {

    this.addNewStudent = (student) => {
        const newStudent = new studentDetailsModel({
            studentID: student.studentID,
            firstName: student.firstName,
            middleName: student.middleName,
            lastName: student.lastName,
            email: student.email,
            mobile: student.mobile
        });
        return new Promise((resolve, reject) => {
            newStudent.save().then( () => {
                resolve({status:200, message:"new student added"});
            }).catch( err => {
                reject({status:500, message:err})
            })
        })
    };
    this.get_student_by_id = (studentID) => {
      return new Promise((resolve, reject) => {
          studentDetailsModel.find({studentID: studentID}).then(data => {
              resolve({status:200, message:data})
          }).catch( err => {
              reject({status:404, message:err})
          })
      })
    };
    this.updateStudentDetails = (student) => {
        return new Promise( (resolve, reject) => {
            studentDetailsModel.findOneAndUpdate(
                {
                    studentID:student.studentID
                },
                {
                    email: student.email,
                    mobile: student.mobile
                }
            ).then( () => {
                resolve({status:200, message: "updated"})
            }).catch( err=>{
                reject({status:500, message:err})
            })
        })
    };
    this.updateStudentEmail = (student) => {
        return new Promise( (resolve, reject) => {
            studentDetailsModel.findOneAndUpdate(
                {
                    studentID:student.studentID
                },
                {
                    email: student.email
                }
            ).then( () => {
                resolve({status:200, message: "updated"})
            }).catch( err=>{
                reject({status:500, message:err})
            })
        })
    };
    this.updateStudentMobile = (student) => {
        return new Promise( (resolve, reject) => {
            studentDetailsModel.findOneAndUpdate(
                {
                    studentID:student.studentID
                },
                {
                    mobile: student.mobile
                }
            ).then( () => {
                resolve({status:200, message: "updated"})
            }).catch( err=>{
                reject({status:500, message:err})
            })
        })
    };
};

module.exports = new StudentDetailsRepo();