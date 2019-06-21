const express = require('express');
const router = express.Router();
const materialRepo = require('../Node.Repository/MaterialRepo');

router.get('/get-material/:id' , (req,res,next) =>{
    const params = req.params;
    materialRepo.getmaterialById(params.id).then((material)=>{
        res.status(material.status).send(material.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

router.get('/get-material' , (req,res,next) =>{
    materialRepo.getmaterial().then((material)=>{
        res.status(material.status).send(material.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

router.post('/add-material', (req, res, next) => {
    const body = req.body;
    materialRepo.insertMaterial(body).then(data => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});


module.exports = router;