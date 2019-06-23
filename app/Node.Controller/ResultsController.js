const express = require('express');
const router = express.Router();
const resultsRepo = require('../Node.Repository/ResultsRepo');


const resultsDetailsSchema = require('../Node.Schema/InstructorSchema');

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


router.get('/get-results' , (req,res,next) =>{
    resultsRepo.getResults().then((results)=>{
        res.status(results.status).send(results.course)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

/*router.post('/add-results', (req, res, next) => {
    const body = req.body;
    resultsRepo.insertResults(body).then(data => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});*/

router.post('/add-results',upload.single('file'), (req,res) =>{
    console.log(req.file);
    resultsRepo.insertResult(req.body.description,req.file.path, req.body.courses).then((result)=>{
        res.status(result.status).send(result.message)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});




router.get('/get-materials',(req,res) => {
    resultsDetailsSchema.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                materials : docs.map(doc => {
                    return{
                        destination:doc.destination,
                        file: doc.file,
                        course:doc.courses,
                        _id:doc._id,
                        request:{
                            type:"GET",
                            url:"http://localhost:3000/api/instructor/results/add-results" + doc._id
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



router.get('/get-results/:code' , (req,res,next) =>{
    const params = req.params;
    console.log("invoked````");
    resultsRepo.getResultsByName(params.code).then((results)=>{
        res.status(results.status).send(results.message)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});

router.put('/update-notice' , (req,res,next) =>{
    console.log(req.body.id);
    resultsRepo.updateResults(req.body).then((result)=>{
        res.status(result.status).send(result.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});


module.exports = router;