const express = require('express');
const router = express.Router();
const NoticeRepo = require('../Node.Repository/NoticeRepo');


router.post('/add-notice', (req, res, next) => {
    const body = req.body;
    NoticeRepo.insterNotices(body).then(data => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

router.get('/get-notices' , (req,res,next) =>{
    NoticeRepo.getNotices().then((notice)=>{
        res.status(notice.status).send(notice.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

router.get('/get-notices/:id' , (req,res,next) =>{
    const params = req.params;
    NoticeRepo.getNoticesById(params.code).then((notice)=>{
        res.status(notice.status).send(notice.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

module.exports = router;