const express = require('express');
const router = express.Router();
const SpecRepository = require('../Node.Controller/SpecializationController');
// const AdminRoleRepository = require('../admin.repository/AdminRoleRepository');

router.get('/get-specializations', (req, res, next) => {
    SpecRepository.getAllSpecializations().then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-specialization-faculties', (req, res, next) => {
    SpecRepository.getAllSpecializationsWithFaculties().then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-specialization/:name', (req, res, next) => {
    const param = req.params;
    SpecRepository.getSpecialization(param.name).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.post('/insert-specialization', (req, res, next) => {
    const body = req.body;
    SpecRepository.insertSpecialization(body).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-next-id', (req, res, next) => {
    SpecRepository.getNextId().then((data) => {
        res.status(data.status).json(data.message)
    }).catch(err => {
        res.status(err.status).json(err.message)
    })
});


module.exports = router;