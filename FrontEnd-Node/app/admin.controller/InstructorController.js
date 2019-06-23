const express = require('express');
const router = express.Router();
const InstructorRepository = require('../admin.repository/InstructorRepository');
const InstructorLoginRepository = require('../admin.repository/InstructorLoginRepository');

router.get('/get-instructors', (req, res, next) => {
    InstructorRepository.getAllInstructors().then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-instructor-count', (req, res, next) => {
    InstructorRepository.getAllInstructorCount().then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});


router.get('/get-instructors-faculties', (req, res, next) => {
    InstructorRepository.getAllInstructorsWithFaculties().then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-instructor/:name', (req, res, next) => {
    const param = req.params;
    InstructorRepository.getInstructor(param.name).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.post('/insert-instructor', (req, res, next) => {
    const body = req.body;
    InstructorRepository.insertInstructor(body).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get-next-id', (req, res, next) => {
    InstructorRepository.getNextId().then((data) => {
        res.status(data.status).json(data.message)
    }).catch(err => {
        res.status(err.status).json(err.message)
    })
});

router.post('/insert-instructor-login', (req, res, next) => {
    const body = req.body;
    InstructorLoginRepository.insertInstructorLogin(body).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});


module.exports = router;