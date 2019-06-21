const express = require('express');
const router = express.Router();
const resultsRepo = require('../Node.Repository/ResultsRepo');


router.get('/get-results' , (req,res,next) =>{
    resultsRepo.getResults().then((results)=>{
        res.status(results.status).send(results.course)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

router.post('/add-results', (req, res, next) => {
    const body = req.body;
    resultsRepo.insertResults(body).then(data => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

module.exports = router;