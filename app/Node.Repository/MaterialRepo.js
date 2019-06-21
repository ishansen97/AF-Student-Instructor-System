const mongoose = require('../Node.Schema/InstructorSchema');
const materialSchema = mongoose.model('materials');

const materialRepo = function () {

    this.insertMaterial = (material)=>{
        return new Promise((resolve , reject)=>{
            const newMaterial = new materialSchema({
                lecureName : material.lecureName,
                week : material.week,
                file: material.file,
                courses: material.course
            });
            newMaterial.save().then(()=>{
                resolve({status:200 , message: 'material added'});
            }).catch(err=>{
                reject({status: 500, message: 'Error: ' +err})
            })
        })
    };
    this.getmaterialById = (material) =>{
        return new Promise((resolve, reject) => {
            materialSchema.find({id}).populate('courses').then((data)=>{
                resolve({status : 200 , courses : data});
            }).catch(err=>{
                reject({status:500 , message: err});
            })
        })
    };

    this.getmaterial = ()=>{
        return new Promise((resolve , reject) =>{
            materialSchema.find().exec().then((data)=>{
                resolve({status: 200 , material:data});
            }).catch(err=>{
                reject({status:500 , message: err});
            })
        })
    }
};


module.exports = new materialRepo();