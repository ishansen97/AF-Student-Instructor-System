const mongoose = require('../Node.Schema/InstructorSchema');
const examDetailsSchema = mongoose.model('exams');

const examRepo = function () {

    this.insertExam = (name , file, dueDate, timeRemaining ,fileToSubmit,courses )=>{
        return new Promise((resolve , reject)=>{
            const newAssignment = new examDetailsSchema({
                name : name,
                file: file,
                dueDate : dueDate,
                timeRemaining:timeRemaining ,
                fileToSubmit :fileToSubmit,
                courses: courses
            });
            newAssignment.save().then(()=>{
                resolve({status:200 , message: 'Exam added'});
            }).catch(err=>{
                reject({status: 500, message: 'Error: ' +err})
            })
        })
    };
    this.getExamsByName = (exams) =>{
        return new Promise((resolve, reject) => {
            examDetailsSchema.find({courses:exams}).then((data)=>{
                resolve({status : 200 , message : data});
            }).catch(err=>{
                reject({status:500 , message: err});
            })
        })
    };

    this.getExams = ()=>{
        return new Promise((resolve , reject) =>{
            examDetailsSchema.find().exec().then((data)=>{
                resolve({status: 200 , message:data});
            }).catch(err=>{
                reject({status:500 , message: err});
            })
        })
    };


    this.updateExam = (name, exam) =>{
        return new Promise((resolve, reject) => {
            examDetailsSchema.findOneAndUpdate
            (
                {
                    _id : name
                },
                {
                    dueDate:exam.dueDate
                }
            )
                .then(() => {
                    resolve({status: 200, message: "added"});
                }).catch(err => {
                reject({status: 500, message: err});
            })
        })
    };
};


module.exports = new examRepo();