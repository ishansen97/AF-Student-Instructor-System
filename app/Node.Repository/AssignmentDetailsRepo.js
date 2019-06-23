const mongoose = require('../Node.Schema/InstructorSchema');
mongoose.set('useFindAndModify', false);
const assignmentDetails = mongoose.model('assignments');

const assignmentRepo = function () {

    this.insertAssignments = (name , file, dueDate, timeRemaining ,fileToSubmit,courses )=>{
        return new Promise((resolve , reject)=>{
            const newAssignment = new assignmentDetails({
                name : name,
                file: file,
                dueDate : dueDate,
                timeRemaining:timeRemaining ,
                fileToSubmit :fileToSubmit,
                courses: courses
            });
            newAssignment.save().then(()=>{
                resolve({status:200 , message: 'Assignment added'});
            }).catch(err=>{
                reject({status: 500, message: 'Error: ' +err})
            })
        })
    };
    this.getassignmentByName = (assignment) =>{
        return new Promise((resolve, reject) => {
            assignmentDetails.find({courses:assignment}).then((data)=>{
                resolve({status : 200 , message : data});
            }).catch(err=>{
                reject({status:500 , message: err});
            })
        })
    };

    this.getAssignment = ()=>{
        return new Promise((resolve , reject) =>{
            assignmentDetails.find().exec().then((data)=>{
                resolve({status: 200 , assignment:data});
            }).catch(err=>{
                reject({status:500 , message: err});
            })
        })
    };


    this.updateAssignment = (name, assignment) =>{
        return new Promise((resolve, reject) => {
            assignmentDetails.findOneAndUpdate
            (
                {
                    _id : name
                },
                {
                dueDate:assignment.dueDate
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


module.exports = new assignmentRepo();