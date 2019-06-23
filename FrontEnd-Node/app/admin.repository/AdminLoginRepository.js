const mongoose = require('../admin.schema/AdminSchema');
const AdminLogin = mongoose.model('AdminLogin');
const AdminConfig = require('../admin.configuration/AdminConfiguration');

const AdminLoginRepository = function () {
    this.insertAdminLogin = (adminLogin) => {
        return new Promise((resolve, reject) => {
            const newAdminLogin = new AdminLogin({
                admin: adminLogin.admin,
                username: adminLogin.username,
                password: adminLogin.password
            });

            newAdminLogin.save().then(() => {
                resolve({status: 201, message: "Added the Admin Login Successfully"})
            }).then(err => {
                reject({status: 500, message: "Admin Login could not be added"})
            })
        })
    }

    this.getAdminLogin = (username) => {
        return new Promise((resolve, reject) => {
            AdminLogin.find({username: username}).exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No such admin is found"})
            })
        })
    }
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

module.exports = new AdminLoginRepository();