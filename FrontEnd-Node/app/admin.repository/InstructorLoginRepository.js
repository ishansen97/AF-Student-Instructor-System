const mongoose = require('../admin.schema/AdminSchema');
const InstructorLogin = mongoose.model('InstructorLogin');
// const AdminConfig = require('../admin.configuration/AdminConfiguration');

const InstructorLoginRepository = function () {
    this.insertInstructorLogin = (instructorLogin) => {
        return new Promise((resolve, reject) => {
            const newInstructorLogin = new InstructorLogin({
                instructor: instructorLogin.instructor,
                username: instructorLogin.username,
                password: instructorLogin.password
            });

            newInstructorLogin.save().then(() => {
                resolve({status: 201, message: "Added the Instructor Login Successfully"})
            }).then(err => {
                reject({status: 500, message: "Instructor Login could not be added"})
            })
        })
    }

    // this.getAdmin = (name) => {
    //     return new Promise((resolve, reject) => {
    //         Admin.find({name: name}).exec().then((data) => {
    //             resolve({status: 200, message: data})
    //         }).catch(err => {
    //             reject({status: 404, message: "No such admin is found"})
    //         })
    //     })
    // }
    //
    // this.getAllAdmin = () => {
    //     return new Promise((resolve, reject) => {
    //         Admin.find().exec().then((data) => {
    //             resolve({status: 200, message: data})
    //         }).catch(err => {
    //             reject({status: 404, message: "No Admins are found"})
    //         })
    //     })
    // }
}

module.exports = new InstructorLoginRepository();