const mongoose = require('../Node.Schema/InstructorSchema');
const materialSchema = mongoose.model('materials');

const materialRepo = function () {

    this.insertMaterial = (lectureName, week, file, course)=>{
        return new Promise((resolve , reject)=>{
            const newMaterial = new materialSchema({
                lectureName : lectureName,
                week : week,
                file: file,
                courses: courses
            });
            newMaterial.save().then(()=>{
                resolve({status:200 , message: 'material added'});
            }).catch(err=>{
                reject({status: 500, message: 'Error: ' +err})
            })
        })
    };

    this.getmaterialByName = (course) =>{
        return new Promise((resolve, reject) => {
            materialSchema.find({courses:course}).then((data)=>{
                resolve({status : 200 , message : data});
            }).catch(err=>{
                reject({status:500 , message: err});
            })
        })
    };

   /* this.getmaterial = ()=>{
        return new Promise((resolve , reject) =>{
            materialSchema.find().exec().then((data)=>{
                resolve({status: 200 , material:data});
            }).catch(err=>{
                reject({status:500 , message: err});
            })
        })
    };*/

    this.updateMaterials = (materials) =>{
        return new Promise((resolve, reject) => {
            materialSchema.findOneAndUpdate(
                {_id:materials.id},
                {file:materials.file})
                .then((data) => {
                resolve({status: 200, notice: data});
            }).catch(err => {
                reject({status: 500, message: err});
            })
        })
    };

};


module.exports = new materialRepo();