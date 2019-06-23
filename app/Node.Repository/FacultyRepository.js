const mongoose = require('../Node.Schema/InstructorSchema');
const Faculty = mongoose.model('Faculty');
const FacultyConfig = require('../Node.Repository/FacultyRepository');

const FacultyRepository = function () {
    this.insertFaculty = (faculty) => {
        return new Promise((resolve, reject) => {
            const newFaculty = new Faculty({
                facultyID: faculty.facultyID,
                name: faculty.name,
            });

            newFaculty.save().then(() => {
                resolve({status: 201, message: "Added the Faculty Successfully"})
            }).then(err => {
                reject({status: 500, message: "Faculty could not be added"})
            })
        })
    }

    this.getFaculty = (name) => {
        return new Promise((resolve, reject) => {
            Faculty.find({name: name}).exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No such Faculty is found"})
            })
        })
    }

    this.getAllFaculties = () => {
        return new Promise((resolve, reject) => {
            Faculty.find().exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No Faculties are found"})
            })
        })
    }

    this.getNextId = () => {
        return new Promise((resolve, reject) => {
            Faculty.findOne().limit(1).sort({facultyID: -1}).exec().then(data => {
                const id = data.facultyID.split("FC", 2);
                let last_id = 0;
                let next_id;
                last_id = parseInt(id[1]);
                last_id++;
                next_id = FacultyConfig.idPattern + "00" + last_id;
                resolve({status: 200, message: next_id})
            }).catch(err => {
                reject({status: 404, message: FacultyConfig.idPattern + FacultyConfig.firstId})
            })
        })
    }
}

module.exports = new FacultyRepository();