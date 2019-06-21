const express = require('express');
const router = express.Router();
const examRepo = require('../Node.Repository/ExamRepo');

router.get('/get-exams/:id' , (req,res,next) =>{
    const params = req.params;
    examRepo.getExamsById(params.id).then((exam)=>{
        res.status(exam.status).send(exam.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});
router.get('/get-exams' , (req,res,next) =>{
    examRepo.getExams().then((exam)=>{
        res.status(exam.status).send(exam.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

router.post('/add-exams', (req, res, next) => {
    const body = req.body;
    examRepo.insertExams(body).then(data => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

module.exports = router;
