const express = require('express');
const router = express.Router();
const studentDetailsRepository = require('../studentRepository/studentRepository');
const studentRepository = require('../studentRepository/studentLogin');
const assignmentUploadRepo = require('../studentRepository/assignmentUpload');
const enrolledCourses = require('../studentRepository/enrolledCourses');
const multer = require('multer');

const storagetry = multer.diskStorage({
   destination: function (req, file, cb) {
       cb(null, "uploads/");
   },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
});
const upload = multer({
    storage: storagetry
});

router.get('/get_all_courses', (req, res) => {
    enrolledCourses.get_courses().then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
})

router.get('/get_all_assignment', (req, res) => {
    assignmentUploadRepo.get_uploaded_assignment().then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});
router.get('/get_all_specializations', (req, res) => {
    enrolledCourses.get_specializations().then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});
router.get('/get_all_faculties', (req, res) => {
    enrolledCourses.get_faculties().then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get_spec_by_id/:id', (req, res) => {
    enrolledCourses.get_specialization_by_id(req.params.id).then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get_courses_by_id/:id', (req, res) => {
    enrolledCourses.get_courses_by_id(req.params.id).then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get_enrolled_courses/:id', (req, res) => {
    enrolledCourses.get_Enrolled_Courses(req.params.id).then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get_notices_by_course/:id', (req, res) => {
    enrolledCourses.get_notices_for_course(req.params.id).then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get_assignments_by_course/:id', (req, res) => {
    enrolledCourses.get_assignments_for_students(req.params.id).then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.put('/update_assignments_by_id/:id', (req, res) => {
    assignmentUploadRepo.updateAssignment(req.params.id, req.body).then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get_course_details/:id', (req, res) => {
    enrolledCourses.get_course_details(req.params.id).then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get_material_details/:id', (req, res) => {
    enrolledCourses.get_materials_for_students(req.params.id).then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.post('/enroll_to_courses', (req, res) => {
    enrolledCourses.add_courses_as_enrolled(req.body).then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.get('/get_fac_by_id/:id', (req, res) => {
    enrolledCourses.get_faculty_by_id(req.params.id).then(data=>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.post('/upload_assignment', upload.single('image'), (req, res) => {
    console.log(req.file.path);
    console.log(req.body.studentID);
    console.log(req.body.assignmentID);
    assignmentUploadRepo.uploadAssignment(req.file.path, req.body.studentID, req.body.assignmentID)
        .then( data => {
            res.status(data.status).send(data.message)
        }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.post('/edit_assignment/:id/:ass', upload.single('image'), (req, res) => {
    console.log(req.file.path);
    console.log(req.params.id);
    assignmentUploadRepo.edit_assignment(req.params.id, req.params.ass, req.file.path)
        .then( data => {
            res.status(data.status).send(data.message)
        }).catch(err => {
        res.status(err.status).send(err.message)
    })
});
router.post('/add_new_student', (req,res) => {
   studentDetailsRepository.addNewStudent(req.body).then( data => {
       res.status(data.status).send(data.message);
   }).catch(err => {
       res.status(err.status).send(err.message)
   })
});
 router.post('/add_new_student_id', (req,res) => {
    studentRepository.addNewStudentId(req.body).then( data => {
        res.status(data.status).send(data.message);
    }) .catch( err => {
        res.status(err.status).send(err.message);
    })
 });
router.get('/find_student_by_id/:id', (req, res) => {
    studentRepository.getStudentId(req.params.id).then(data =>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});
router.get('/find_student_by_username/:id', (req, res) => {
    studentRepository.getStudentByUsername(req.params.id).then(data =>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});
router.get('/find_student_by_student_id/:id', (req, res) => {
    studentDetailsRepository.get_student_by_id(req.params.id).then(data =>{
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});
 router.post('/update_student_login', (req,res)=> {
    studentRepository.addNewStudentLoginDetails(req.body).then(data => {
        res.status(data.status).send(data.message)
    }).catch( err => {
        res.status(err.status).send(err.message)
    })
 });
 router.post('/update_student_details', (req, res)=> {
    studentDetailsRepository.updateStudentDetails(req.body).then( data=>{
        res.status(data.status).send(data.message)
    }).catch(err =>{
        res.status(err.status).send(err.message)
    })
 });

module.exports = router;