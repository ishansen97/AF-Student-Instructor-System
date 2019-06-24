import React, {Component} from "react";
import {COURSE_SELECTED_TO_ENROLL} from "./all_courses";
import {STUDENT_SESSION} from "./studentLogin";

class EnrollToCourse extends Component{
    constructor(props) {
        super(props);
        this.state = {
            courseID:sessionStorage.getItem(COURSE_SELECTED_TO_ENROLL),
            courseToEnroll:[],
            studentID:sessionStorage.getItem(STUDENT_SESSION)
        }
    }

    componentDidMount() {
        fetch('api/resources/student/get_course_details/'+ sessionStorage.getItem(COURSE_SELECTED_TO_ENROLL))
            .then(data => {
                return data.json();
            }).then( jsonData => {
                this.setState({courseToEnroll:jsonData})
        }).catch( err => {
            console.error(err)
        })
    }

    enrollME(e){
        e.preventDefault();
        console.log(document.getElementById("enrolmentkey").value)
        this.state.courseToEnroll.map( coursecheck =>{
            if(coursecheck.enrollmentKey === document.getElementById("enrolmentkey").value){
                alert('enrolled ' + this.state.studentID)
                fetch('api/resources/student/enroll_to_courses', {
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({
                        "studentID":this.state.studentID,
                        "courseID":coursecheck._id
                    })
                }).then(data => {
                    return data.json();
                }).then( jsonData => {
                    console.log(jsonData)
                }).catch( err => {
                    console.error(err);
                    alert('successfully enrolled!');
                    this.props.history.push('/enrolledCourses');
                })
            }else{
                alert('please enter correct key')
            }
        })
    }

    render() {
        return(
            <div>
                {this.state.courseToEnroll.map(course =>
                    <div className="card">
                        <h2 className="card-header">{course.courseName}</h2>
                        <input id="enrolmentkey" type="text" placeholder="Enrolment Key"/><button onClick={e => {this.enrollME(e)}} className="btn btn-warning">Submit</button>
                    </div>
                )}
            </div>
        )
    }
}
export default EnrollToCourse;