const express = require('express');
const router = express.Router();
const assignmentRepo = require('../Node.Repository/AssignmentDetailsRepo');
const assignmentDetailsSchema = require('../Node.Schema/InstructorSchema');

const multer = require('multer');
// const upload = multer({dest: 'uploads/'});

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


router.get('/get-assignments/:courseName' , (req,res,next) =>{
    const params = req.params;
    assignmentRepo.getassignmentByName(params.courseName).then((assignment)=>{
        res.status(assignment.status).send(assignment.message)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});
/*router.get('/get-assignments' , (req,res,next) =>{
    assignmentRepo.getAssignment().then((assignment)=>{
        res.status(assignment.status).send(assignment.message)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});*/

router.post('/add-assignments',upload.single('file'), (req, res) => {
    console.log(req.file);
    assignmentRepo.insertAssignments
    (req.body.name,  req.file.path ,req.body.dueDate, req.body.timeRemaining ,req.body.fileToSubmit ,req.body.courses ).then(data => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

router.get('/get-materials',(req,res) => {
    assignmentDetailsSchema.find()
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
                            url:"http://localhost:3000/api/instructor/assignments/add-assignments" + doc._id
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





router.put('/update-assignment/:id' , (req,res,next) =>{
    console.log(req.params.id);
    console.log(req.body.dueDate);
    assignmentRepo.updateAssignment(req.params.id, req.body).then((assignment)=>{
        res.status(assignment.status).send(assignment.courses)
    }).catch(err=>{
        res.status(err.status).send(err.message);
    })
});


module.exports = router;
