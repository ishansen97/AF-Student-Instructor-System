const mongoose = require('../Node.Schema/InstructorSchema');
const resultsDetailsSchema = mongoose.model('results');

const resultsRepo = function () {

    this.insertResult = (description, file,courses)=>{
        return new Promise((resolve , reject)=>{
            const newMaterial = new resultsDetailsSchema({
                description : description,
                file: file,
                courses: courses
            });
            newMaterial.save().then(()=>{
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
    };

    this.getResultsByName = (results) => {
        return new Promise((resolve, reject) => {
            resultsDetailsSchema.find({courses: results}).then((data) => {
                resolve({status: 200, message: data});
            }).catch(err => {
                reject({status: 500, message: err});
            })
        })

    };

    this.updateResults = (results) =>{
        return new Promise((resolve, reject) => {
            resultsDetailsSchema.findOneAndUpdate(
                {_id:results.id},
                {file:results.file})
                .then(() => {
                resolve({status: 200, notice: "added"});
            }).catch(err => {
                reject({status: 500, message: err});
            })
        })
    };
};


module.exports = new resultsRepo();