const mongoose = require('../Node.Schema/InstructorSchema');
const examDetailsSchema = mongoose.model('exams');

const examRepo = function () {

    this.insertExams = (exams)=>{
        return new Promise((resolve , reject)=>{
            const newExams = new examDetailsSchema({
                name : exams.name,
                descriptionFile: exams.descriptionFile,
                dueDate : exams.dueDate,
                timeRemaining:exams.timeRemaining ,
                fileToSubmit :exams.fileToSubmit,
                courses: exams.course
            });
            newExams.save().then(()=>{
                resolve({status:200 , message: 'Exam added'});
            }).catch(err=>{
                reject({status: 500, message: 'Error: ' +err})
            })
        })
    };
    this.getExamsById = (exams) =>{
        return new Promise((resolve, reject) => {
            examDetailsSchema.find({id}).populate('courses').then((data)=>{
                resolve({status : 200 , courses : data});
            }).catch(err=>{
                reject({status:500 , message: err});
            })
        })
    };

    this.getExams = ()=>{
        return new Promise((resolve , reject) =>{
            examDetailsSchema.find().exec().then((data)=>{
                resolve({status: 200 , exams:data});
            }).catch(err=>{
                reject({status:500 , message: err});
            })
        })
    }
};


module.exports = new examRepo();