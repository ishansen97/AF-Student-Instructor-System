const mongoose = require('../Node.Schema/InstructorSchema');
const Specialization = mongoose.model('Specialization');
const SpecConfig = require('../Node.Repository/SpecializationRepository');

const SpecializationRepository = function () {
    this.insertSpecialization = (spec) => {
        return new Promise((resolve, reject) => {
            const newSpec = new Specialization({
                specializationID: spec.specializationID,
                name: spec.name,
                no_of_years: spec.no_of_years,
                type: spec.type,
                faculty: spec.faculty
            });

            newSpec.save().then(() => {
                resolve({status: 201, message: "Added the Specialization Successfully"})
            }).then(err => {
                reject({status: 500, message: "Specialization could not be added"})
            })
        })
    }

    this.getSpecialization = (name) => {
        return new Promise((resolve, reject) => {
            Specialization.find({name: name}).exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No such Specialization is found"})
            })
        })
    }

    this.getAllSpecializations = () => {
        return new Promise((resolve, reject) => {
            Specialization.find().exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No Specializations are found"})
            })
        })
    }

    this.getAllSpecializationsWithFaculties = () => {
        return new Promise((resolve, reject) => {
            Specialization.find().populate('faculty').exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No Specializations are found"})
            })
        })
    }

    this.getNextId = () => {
        return new Promise((resolve, reject) => {
            Specialization.findOne().limit(1).sort({specializationID: -1}).exec().then(data => {
                const id = data.specializationID.split(SpecConfig.idPattern, 2);
                let last_id = 0;
                let next_id;
                last_id = parseInt(id[1]);
                last_id++;
                next_id = SpecConfig.idPattern + "000" + last_id;
                resolve({status: 200, message: next_id})
            }).catch(err => {
                reject({status: 404, message: SpecConfig.idPattern + SpecConfig.firstId})
            })
        })
    }
}

module.exports = new SpecializationRepository();