const mongoose = require('../studentSchema/studentSchema');
mongoose.set('useFindAndModify', false);
const coursesModel = mongoose.model('courses');
const specializationModel = mongoose.model('Specialization');
const facultyModel = mongoose.model('Faculty');
const studentEnrolledModel = mongoose.model('student_enrolled');
const noticesModel = mongoose.model('notices');
const assignmentssModel = mongoose.model('assignments');
const materialsModel = mongoose.model('materials');

const EnrolledCourses = function () {

    this.get_assignments_for_students = (courseID) => {
        return new Promise((resolve, reject) => {
            assignmentssModel.find({courses : courseID}).then( data => {
                resolve({status:200, message: data})
            }).catch(err => {
                reject({status:500, message: err})
            })
        })
    };
    this.get_materials_for_students = (courseID) => {
        return new Promise((resolve, reject) => {
            materialsModel.find({courses : courseID}).then( data => {
                resolve({status:200, message: data})
            }).catch(err => {
                reject({status:500, message: err})
            })
        })
    };
    this.get_notices_for_course = (courseID) => {
        return new Promise((resolve, reject) => {
            noticesModel.find({courses : courseID}).then( data => {
                resolve({status:200, message: data})
            }).catch(err => {
                reject({status:500, message: err})
            })
        })
    };
    this.get_course_details = (courseID) => {
        return new Promise((resolve, reject) => {
            coursesModel.find({_id : courseID}).then( data => {
                resolve({status:200, message: data})
            }).catch(err => {
                reject({status:500, message: err})
            })
        })
    };
    this.get_Enrolled_Courses = (studentID) => {
        return new Promise((resolve, reject) => {
            studentEnrolledModel.find({studentID : studentID}).then( data => {
                resolve({status:200, message: data})
            }).catch(err => {
                reject({status:500, message: err})
            })
        })
    };
    this.add_courses_as_enrolled = (enroll) => {
        const newEnrolledOne = new studentEnrolledModel({
            studentID:enroll.studentID,
            courseID:enroll.courseID
        });
       return new Promise((resolve, reject) => {
           newEnrolledOne.save().then( () => {
               resolve({status:200, message: "enrolled to course"})
           }).catch(err => {
               reject({status:500, message: err})
           })
       })
    };
    this.get_courses = () => {
        return new Promise((resolve, reject) => {
            coursesModel.find().then( data => {
                resolve({status:200, message: data})
            }).catch(err => {
                reject({status:500, message: err})
            })
        })
    };
    this.get_specializations = () => {
        return new Promise((resolve, reject) => {
            specializationModel.find().then( data => {
                resolve({status:200, message: data})
            }).catch(err => {
                reject({status:500, message: err})
            })
        })
    };
    this.get_faculties = () => {
        return new Promise((resolve, reject) => {
            facultyModel.find().then( data => {
                resolve({status:200, message: data})
            }).catch(err => {
                reject({status:500, message: err})
            })
        })
    };
    this.get_specialization_by_id = (facID) => {
        return new Promise((resolve, reject) => {
            specializationModel.find({faculty: facID}).then(data => {
                resolve({status:200, message:data})
            }).catch(err => {
                reject({status:500, message:err})
            })
        })
    };
    this.get_courses_by_id = (specID) => {
        return new Promise((resolve, reject) => {
            coursesModel.find({specialize: specID}).then(data => {
                resolve({status:200, message:data})
            }).catch(err => {
                reject({status:500, message:err})
            })
        })
    };
    this.get_faculty_by_id = (facultyID) => {
        return new Promise((resolve, reject) => {
            facultyModel.find({_id: facultyID}).then(data => {
                resolve({status:200, message:data})
            }).catch(err => {
                reject({status:500, message:err})
            })
        })
    };
};
module.exports = new EnrolledCourses();