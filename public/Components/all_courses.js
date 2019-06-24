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
              console.log(enrldcrss.courseID);
              sessionStorage.setItem(COURSE_SELECTED_TO_ENROLL, e.target.value);
              this.props.history.push(`/enroll_to`)
          }
        }
        );
        console.log(e.target.value)
    }


    render() {
        return (
            <div className="container-fluid">
                <h1 className="card-header bg-dark text-white">Courses</h1>
                {this.state.allCourses.map(specs =>
                    <div  className="">
                        <button type="button"
                                className="btn btn-secondary btn-lg btn-block"
                                onClick={e => {this.courseClick(e)}} value={specs._id}>
                            {specs.courseName}
                        </button>
                        {/*<button*/}
                            {/*onClick={e => {this.courseClick(e)}} value={specs._id}*/}
                            {/*className="btn btn-dark">{specs.courseName}</button>*/}
                        {/*<li><i className="fas fa-book-open"*/}
                               {/*style={{size: "9x"}}/> &nbsp;{specs.courseName}</li>*/}
                    </div>
                )}
            </div>
        );
    }
}

export default AllCourses;

