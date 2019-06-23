const mongoose = require('../admin.schema/AdminSchema');
const Admin = mongoose.model('Admin');
const AdminConfig = require('../admin.configuration/AdminConfiguration');

const AdminRepository = function () {
    this.insertAdmin = (admin) => {
        return new Promise((resolve, reject) => {
            const newAdmin = new Admin({
                Admin_Id: admin.Admin_Id,
                name: admin.name,
                role: admin.role
            });

            newAdmin.save().then(() => {
                resolve({status: 201, message: "Added the Admin Successfully"})
            }).then(err => {
                reject({status: 500, message: "Admin could not be added"})
            })
        })
    }

    this.getAdmin = (name) => {
        return new Promise((resolve, reject) => {
            Admin.find({Admin_Id: name}).exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No such admin is found"})
            })
        })
    }

    this.getAdminWithRole = (name) => {
        return new Promise((resolve, reject) => {
            Admin.find({Admin_Id: name}).populate('role').exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No such admin is found"})
            })
        })
    }

    this.getAllAdmin = () => {
        return new Promise((resolve, reject) => {
            Admin.find().exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No Admins are found"})
            })
        })
    }

    this.getAllAdminRoles = () => {
        return new Promise((resolve, reject) => {
            Admin.find().populate('role').exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No Admins are found"})
            })
        })
    }

    this.getNextId = () => {
        return new Promise((resolve, reject) => {
            Admin.findOne().limit(1).sort({Admin_Id: -1}).exec().then(data => {
                const id = data.Admin_Id.split("AD", 2);
                let last_id = 0;
                let next_id;
                last_id = parseInt(id[1]);
                last_id++;
                next_id = "00" + last_id;
                resolve({status: 200, message: next_id})
            }).catch(err => {
                reject({status: 404, message: AdminConfig.firstId})
            })
        })
    }

    this.updateAdminName = (id, data) => {
        return new Promise((resolve, reject) => {
            Admin.findOneAndUpdate(
                {Admin_Id: id.toString()},
                {name: data.name},
                {new: true, runValidators: true}
            )
                .then(() => {
                    resolve({status: 204, message: "successfully updated"})
                })
                .catch(err => {
                    reject({status: 500, message: "cannot be updated"})
                })
        })
    }
}

module.exports = new AdminRepository();