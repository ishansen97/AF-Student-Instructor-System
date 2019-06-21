const mongoose = require('../Node.Schema/InstructorSchema');
const resultsDetailsSchema = mongoose.model('results');

const resultsRepo = function () {

    this.insertResults = (results)=>{
        return new Promise((resolve , reject)=>{
            const newCourse = new resultsDetailsSchema({
                description : results.description,
                fileToSubmit : results.fileToSubmit,
                courses: results.course
            });
            newCourse.save().then(()=>{
                resolve({status:200 , message: 'result added'});
            }).catch(err=>{
                reject({status: 500, message: 'Error: ' +err})
            })
        })
    };

    this.getResults= ()=>{
        return new Promise((resolve , reject) =>{
            resultsDetailsSchema.find().exec().then((data)=>{
                resolve({status: 200 , results:data});
            }).catch(err=>{
                reject({status:500 , message: err});
            })
        })
    }
};


module.exports = new resultsRepo();