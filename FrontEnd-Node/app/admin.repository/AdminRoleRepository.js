const mongoose = require('../admin.schema/AdminSchema');
const AdminRole = mongoose.model('Admin_Roles');

const AdminRoleRepository = function () {
    this.insertAdminRole = (admin_role) => {
        return new Promise((resolve, reject) => {
            const newAdminRole = new AdminRole({
                role: admin_role.role
            });

            newAdminRole.save().then(() => {
                resolve({status: 201, message: "Added the Admin Role Successfully"})
            }).then(err => {
                reject({status: 500, message: "Admin Role could not be added"})
            })
        })
    }

    this.getAdminRoles = () => {
        return new Promise((resolve, reject) => {
            AdminRole.find({}).exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "No Admins Roles are found"})
            })
        })
    }
}

module.exports = new AdminRoleRepository();