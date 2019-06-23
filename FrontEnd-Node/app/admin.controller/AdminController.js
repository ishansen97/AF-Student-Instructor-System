const express = require('express');
const router = express.Router();
const AdminRepository = require('../admin.repository/AdminRepository');
const AdminRoleRepository = require('../admin.repository/AdminRoleRepository');
const AdminLoginRepository = require('../admin.repository/AdminLoginRepository');

router.get('/get-admins', (req, res, next) => {
    AdminRepository.getAllAdmin().then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-admins-with-roles', (req, res, next) => {
    AdminRepository.getAllAdminRoles().then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-admin/:name', (req, res, next) => {
    const param = req.params;
    AdminRepository.getAdmin(param.name).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-admin-login/:name', (req, res, next) => {
    const param = req.params;
    AdminLoginRepository.getAdminLogin(param.name).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-admin-with-role/:name', (req, res, next) => {
    const param = req.params;
    AdminRepository.getAdminWithRole(param.name).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});



router.post('/insert-admin', (req, res, next) => {
    const body = req.body;
    AdminRepository.insertAdmin(body).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.put('/update-admin/:id', (req, res, next) => {
    const body = req.body;
    const param = req.params
    AdminRepository.updateAdminName(param.id, body).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-next-id', (req, res, next) => {
    AdminRepository.getNextId().then((data) => {
        res.status(data.status).json(data.message)
    }).catch(err => {
        res.status(err.status).json(err.message)
    })
});

router.get('/get-admin-roles', (req, res, next) => {
    AdminRoleRepository.getAdminRoles().then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});


router.post('/insert-admin-role', (req, res, next) => {
    const body = req.body;
    AdminRoleRepository.insertAdminRole(body).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.post('/insert-admin-login', (req, res, next) => {
    const body = req.body;
    AdminLoginRepository.insertAdminLogin(body).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

module.exports = router;