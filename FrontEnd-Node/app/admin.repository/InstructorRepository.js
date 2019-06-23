const mongoose = require('../admin.schema/AdminSchema');
const InstructorModel = mongoose.model('Instructor');
const InstructorConfig = require('../admin.configuration/InstructorConfiguration');

const InstructorRepository = function () {
    this.insertInstructor = (ins) => {
        return new Promise((resolve, reject) => {
            const newInstructor = new InstructorModel({
                Instructor_Id: ins.Instructor_Id,
                firstName: ins.firstName,
                lastName: ins.lastName,
                age: parseInt(ins.age),
                email: ins.email,
                faculty: ins.faculty
            });

            newInstructor.save().then(() => {
                resolve({status: 201, message: "Added the Instructor Successfully"})
            }).then(err => {
                reject({status: 500, message: "Instructor could not be added"})
            })
        })
    }

    this.getInstructor = (name) => {
        return new Promise((resolve, reject) => {
            InstructorModel.find({firstName: name}).exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No such Instructor is found"})
            })
        })
    }

    this.getAllInstructors = () => {
        return new Promise((resolve, reject) => {
            InstructorModel.find().exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No Specializations are found"})
            })
        })
    }

    this.getAllInstructorCount = () => {
        return new Promise((resolve, reject) => {
            InstructorModel.count().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No Specializations are found"})
            })
        })
    }

    this.getAllInstructorsWithFaculties = () => {
        return new Promise((resolve, reject) => {
            InstructorModel.find().populate('faculty').exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No Specializations are found"})
            })
        })
    }

    this.getNextId = () => {
        return new Promise((resolve, reject) => {
            InstructorModel.findOne().limit(1).sort({Instructor_Id: -1}).exec().then(data => {
                const id = data.Instructor_Id.split(InstructorConfig.idPattern, 2);
                let last_id = 0;
                let next_id;
                last_id = parseInt(id[1]);
                last_id++;
                next_id = InstructorConfig.idPattern + "000" + last_id;
                resolve({status: 200, message: next_id})
            }).catch(err => {
                reject({status: 404, message: InstructorConfig.idPattern + InstructorConfig.firstId})
            })
        })
    }
}

module.exports = new InstructorRepository();