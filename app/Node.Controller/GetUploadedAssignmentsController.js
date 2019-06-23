const express = require('express');
const router = express.Router();
const assignmentUploadRepo = require('../Node.Repository/GetUploadedAssignmentsRepo');

router.get('/get_all_assignment', (req, res) => {
    assignmentUploadRepo.get_uploaded_assignment().then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});
module.exports = router;
