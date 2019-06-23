import React, {Component} from "react";
import FileUploader from "./FileUploader";
import {Link} from "react-router-dom";
import {STUDENT_SESSION} from "./studentLogin";
const SESSION_ID = "IT17098960";
export const COURSE_SELECTED = "COURSE SELECTED";
export const COURSE_SELECTED_TO_ENROLL = "COURSE SELECTED";

class AllCourses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            allCourses:[],
            enrolledCourses:[]
        }
    }

    componentDidMount() {
        Object.values(this.state.props.location.moduleProps).map(faculty =>
            fetch('api/resources/student/get_courses_by_id/'+ faculty._id).then(data=>{
                return data.json();
            }).then(json =>{
                this.setState({allCourses:json})
            }).catch( err=>{
                console.log(err)
            })
        );
        fetch('api/resources/student/get_enrolled_courses/'+sessionStorage.getItem(STUDENT_SESSION)).then(data => {
            return data.json()
        }).then( jsonData => {
            this.setState({enrolledCourses:jsonData})
        }).catch(err => {
            console.log(err)
        })
    }

    courseClick(e){
        e.preventDefault();
        this.state.enrolledCourses.map(enrldcrss =>{
          if(enrldcrss.courseID === e.target.value){
              sessionStorage.setItem(COURSE_SELECTED, enrldcrss.courseID);
              this.props.history.push(`/selected_course`)
          }else{
              sessionStorage.setItem(COURSE_SELECTED_TO_ENROLL, enrldcrss.courseID);
              this.props.history.push(`/enroll_to_course`)
          }
        }
        );
        console.log(e.target.value)
    }


    render() {
        return (
            <div className="container-fluid">
                <h2>Courses</h2>
                {this.state.allCourses.map(specs =>
                    <div>
                        <button onClick={e => {this.courseClick(e)}} value={specs._id} className="btn btn-info">{specs.courseName}</button>
                    </div>
                )}
            </div>
        );
    }
}

export default AllCourses;

