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

router.get('/get-notices/:code' , (req,res,next) =>{
    const params = req.params;
    console.log("invoked");
    NoticeRepo.getNoticesByName(params.code).then((notice)=>{
        res.status(notice.status).send(notice.message)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

router.put('/update-notice' , (req,res,next) =>{
   console.log(req.body.id);
    NoticeRepo.updateNotice(req.body).then((notice)=>{
        res.status(notice.status).send(notice.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});



module.exports = router;