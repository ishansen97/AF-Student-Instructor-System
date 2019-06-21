const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseStructure= new Schema ({

    courseName: {
        type: String,
        require: true
    },

    year: {
        type: String,
        require: true
    },

    semester:{
        type: String,
        require:true
    },

    // faculty: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Faculty"
    // },

    specialize:{
        type: Schema.Types.ObjectId,

        ref: "Specialization"
    },

    // specialize: {
    //     type:String,
    //     require:true
    // },

    courseHead: {
        type: String,
        require: true
    },

    enrollmentKey: {
        type: String,
        require: true
    },

    credits: {
        type: Number,
        require: true
    }

});

//-------------------------------------------------------------------------------------------------------//


const AdminSchema = new mongoose.Schema({
    Admin_Id: {
        type: String
    },
    name: {
        type: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin_Roles'
    }
});

const Admin_Roles = new mongoose.Schema({
    role: {
        type: String,
        // enum: ['Main', 'Computing', 'Engineering', 'Law']
    }
});


const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    facultyID: {
        type: String
    }
});

const specializationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    specializationID: {
        type: String,
        require: true
    },
    no_of_years: {
        type: Number
    },
    type: {
        type: String,
        require: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty'
    }
});

const instructorSchema = new mongoose.Schema({
    Instructor_Id: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty'
    }
});

const adminLoginSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
});

const instructorLoginSchema = new mongoose.Schema({
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor'
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
});


mongoose.connect('mongodb+srv://Sohan:sohan123@afcluster-ev5ge.mongodb.net/AF_WD_05?retryWrites=true&w=majority', err => {
    if (err){
        console.error(err);
        process.exit(-1);
    }
    console.log('Successfully Connected to mongoDB');
});

// mongoose.connect('mongodb://localhost:27017/project_course', err => {
//    if (err){
//        console.error(err);
//        process.exit(-1);
//    }
//    console.log("Successfully connected to Mongodb")
// });

mongoose.model("Course", CourseStructure);

//--------------------------------------------------------------------//

mongoose.model('Admin', AdminSchema);
mongoose.model('Admin_Roles', Admin_Roles);
mongoose.model('Faculty', facultySchema);
mongoose.model('Specialization', specializationSchema);
mongoose.model('Instructor', instructorSchema);
mongoose.model('InstructorLogin', instructorSchema);
mongoose.model('AdminLogin', adminLoginSchema);


module.exports = mongoose;


// This process is running on port 4000