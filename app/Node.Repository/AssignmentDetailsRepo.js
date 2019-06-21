const mongoose = require('../Node.Schema/InstructorSchema');
const assignmentDetails = mongoose.model('assignments');

const assignmentRepo = function () {

    this.insertAssignments = (assignment)=>{
        return new Promise((resolve , reject)=>{
            const newAssignment = new assignmentDetails({
                name : assignment.name,
                descriptionFile: assignment.descriptionFile,
                dueDate : assignment.dueDate,
                timeRemaining:assignment.timeRemaining ,
                fileToSubmit :assignment.fileToSubmit,
                courses: assignment.course
            });
            newAssignment.save().then(()=>{
                resolve({status:200 , message: 'Assignment added'});
            }).catch(err=>{
                reject({status: 500, message: 'Error: ' +err})
            })
        })
    };
    this.getassignmentById = (assignment) =>{
        return new Promise((resolve, reject) => {
            assignmentDetails.find({id}).populate('courses').then((data)=>{
                resolve({status : 200 , courses : data});
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
    }
};


module.exports = new assignmentRepo();