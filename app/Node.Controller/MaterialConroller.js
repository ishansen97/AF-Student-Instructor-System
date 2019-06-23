const express = require('express');
const router = express.Router();
const materialRepo = require('../Node.Repository/MaterialRepo');
const materialSchema = require('../Node.Schema/InstructorSchema');

const multer = require('multer');
// const upload = multer({dest: 'uploads/'});
//

const storage= multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname)
    }
});

const upload = multer({
    storage:storage
});


router.get('/get-material/:code' , (req,res,next) =>{
    const params = req.params;
    materialRepo.getmaterialByName(params.code).then((material)=>{
        res.status(material.status).send(material.message)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

/*router.get('/get-material' , (req,res,next) =>{
    materialRepo.getmaterial().then((material)=>{
        res.status(material.status).send(material.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});*/

// router.post('/add-material', upload.single('materials'),(req, res, next) => {
//     console.log(req.file);
//     const body = req.body;
//     materialRepo.insertMaterial(body).then(data => {
//         res.status(data.status).send(data.message)
//     }).catch(err => {
//         res.status(err.status).send(err.message);
//     })
// });


router.post('/add-material',upload.single('file'), (req,res) =>{
    console.log(req.file);
        materialRepo.insertMaterial(req.body.lectureName, req.body.week, req.file.path, req.body.courses).then((material)=>{
            res.status(material.status).send(material.message)
        }).catch(err=>{
            res.status(err.status).send(err.message);
        })
});

router.get('/get-materials',(req,res) => {
    materialSchema.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                materials : docs.map(doc => {
                    return{
                        lectureName:doc.lectureName,
                        file: doc.file,
                        week:doc.week,
                        course:doc.courses,
                        _id:doc._id,
                        request:{
                            type:"GET",
                            url:"http://localhost:3000/api/instructor/materials/add-material" + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});



router.put('/update-material' , (req,res,next) =>{
    console.log(req.body.id);
    materialRepo.updateMaterials(req.body).then((material)=>{
        res.status(material.status).send(material.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

module.exports = router;