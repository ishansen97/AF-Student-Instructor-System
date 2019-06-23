const express = require('express');
const router = express.Router();
const examRepo = require('../Node.Repository/ExamRepo');
const multer = require('multer');
const examDetailsSchema = require('../Node.Schema/InstructorSchema');

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



router.get('/get-exams/:code' , (req,res,next) =>{
    const params = req.params;
    examRepo.getExamsByName(params.code).then((exam)=>{
        res.status(exam.status).send(exam.message)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});
router.get('/get-exams' , (req,res,next) =>{
    examRepo.getExams().then((exam)=>{
        res.status(exam.status).send(exam.message)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});


router.post('/add-exams',upload.single('file'), (req, res) => {
    console.log(req.file);
    examRepo.insertExam(req.body.name, req.file.path, req.body.dueDate,req.body.timeRemaining ,req.body.fileToSubmit ,req.body.courses ).then(data => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

/*
router.post('/add-exams', (req, res, next) => {
    const body = req.body;
    examRepo.insertExams(body).then(data => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});*/

// router.post('/add-exams',upload.single('file'), (req, res, next) => {
//     const body = req.body;
//     examRepo.insertExams(req.body.name, req.body.dueDate, req.file.path,req.body.timeRemaining ,req.body.fileToSubmit ,req.body.course ).then(data => {
//         res.status(data.status).send(data.message)
//     }).catch(err => {
//         res.status(err.status).send(err.message);
//     })
// });


router.get('/get-materials',(req,res) => {
    examDetailsSchema.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                materials : docs.map(doc => {
                    return{
                        name:doc.name,
                        file: doc.file,
                        dueDate:doc.dueDate,
                        timeRemaining:doc.timeRemaining,
                        fileToSubmit:doc.fileToSubmit,
                        course:doc.course,
                        _id:doc._id,
                        request:{
                            type:"GET",
                            url:"http://localhost:3000/api/instructor/exams/add-exam" + doc._id
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



router.put('/update-exam/:id' , (req,res,next) =>{
    console.log(req.params.id);
    console.log(req.body.dueDate);
    examRepo.updateExam(req.params.id, req.body).then((exam)=>{
        res.status(exam.status).send(exam.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});


module.exports = router;
