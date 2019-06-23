const express = require('express');
const router = express.Router();
const getStudentDetailsRepo = require('../Node.Repository/GetStudentDetailsRepo');

router.get('/get-results' , (req,res,next) =>{
    getStudentDetailsRepo.getStudentEmail().then((data)=>{
        res.status(data.status).send(data.message)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

module.exports = router;