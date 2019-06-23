const express = require('express');
const router = express.Router();
const FacultyRepository = require('../Node.Controller/FacultyController');
// const AdminRoleRepository = require('../admin.repository/AdminRoleRepository');

router.get('/get-faculties', (req, res, next) => {
    FacultyRepository.getAllFaculties().then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-faculty/:name', (req, res, next) => {
    const param = req.params;
    FacultyRepository.getFaculty(param.name).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.post('/insert-faculty', (req, res, next) => {
    const body = req.body;
    FacultyRepository.insertFaculty(body).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-next-id', (req, res, next) => {
    FacultyRepository.getNextId().then((data) => {
        res.status(data.status).json(data.message)
    }).catch(err => {
        res.status(err.status).json(err.message)
    })
});


module.exports = router;