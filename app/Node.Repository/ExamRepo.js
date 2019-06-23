const mongoose = require('../Node.Schema/InstructorSchema');
const examDetailsSchema = mongoose.model('exams');
const nodemailer=require('nodemailer');
const bcrypt=require('bcrypt');

const examRepo = function () {

    this.insertExam = (name , file, dueDate, timeRemaining ,fileToSubmit,courses )=>{
        return new Promise((resolve , reject)=>{
            const newExam = new examDetailsSchema({
                name : name,
                file: file,
                dueDate : dueDate,
                timeRemaining:timeRemaining ,
                fileToSubmit :fileToSubmit,
                courses: courses
            });
            newExam.save().then(()=>{
                resolve({status:200 , message: 'Exam added'});
            }).catch(err=>{
                reject({status: 500, message: 'Error: ' +err})
            })

/*

            newExam.save().then(()=>{
            //send email to student email
            Student.find().select('email').exec().then(results=>{
                const transporter=nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        user:'stu2019info@gmail.com',
                        pass:'ljxgjhhfuvotignp'
                    }
                });
                const mailOptions={
                    from:'',
                    to: results,
                    subject:'New Exam added',
                    html:'Hi Student,<br/> A new exam has been created for the module :'+ result.moduleName+' <br/>'
                        +'Please Login to see the exam on system'
                };

                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log('Email sent:'+info.response);
                    }
                })
                console.log(results);
            });
            console.log(result);
            res.status(201).json({
                message:'Exam added',
                createdExam:result
            });
        }).catch(err=>{
            console.log(err.message);
            res.status(500).json({
                error:err
            })
        });
*/

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