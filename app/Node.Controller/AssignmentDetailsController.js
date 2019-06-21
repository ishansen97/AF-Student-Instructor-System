const express = require('express');
const router = express.Router();
const assignmentRepo = require('../Node.Repository/AssignmentDetailsRepo');

router.get('/get-assignments/:id' , (req,res,next) =>{
    const params = req.params;
    assignmentRepo.getassignmentById(params.id).then((assignment)=>{
        res.status(assignment.status).send(assignment.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});
router.get('/get-assignments' , (req,res,next) =>{
    assignmentRepo.getAssignment().then((assignment)=>{
        res.status(assignment.status).send(assignment.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

router.post('/add-assignments', (req, res, next) => {
    const body = req.body;
    assignmentRepo.insertAssignments(body).then(data => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

module.exports = router;
