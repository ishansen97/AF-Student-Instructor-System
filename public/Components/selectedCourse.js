import React, {Component} from "react";
import FileUploader from "./FileUploader";
import {COURSE_SELECTED} from "./all_courses";
import {STUDENT_SESSION} from "./studentLogin";
const SESSION_ID = "IT17098960";

class SelectedCourse extends Component{
    constructor(props) {
        super(props);
        this.state = {
            courseID:sessionStorage.getItem(COURSE_SELECTED),
            courseDetails:[],
            noticeDetails:[],
            assignmentDetails:[],
            materials:[]
        }
    }

    componentDidMount() {
        fetch('api/resources/student/get_course_details/'+this.state.courseID).then( data => {
            return data.json();
        }).then( jsonData => {
            this.setState({courseDetails:jsonData})
        }).catch( err => {
            console.log(err)
        });

        fetch('api/resources/student/get_notices_by_course/'+this.state.courseID).then( data => {
            return data.json();
        }).then( jsonData => {
            this.setState({noticeDetails:jsonData})
        }).catch( err => {
            console.log(err)
        });

        fetch('api/resources/student/get_assignments_by_course/'+this.state.courseID).then( data => {
            return data.json();
        }).then( jsonData => {
            this.setState({assignmentDetails:jsonData})
        }).catch( err => {
            console.log(err)
        });

        fetch('api/resources/student/get_material_details/'+this.state.courseID).then( data => {
            return data.json();
        }).then( jsonData => {
            this.setState({materials:jsonData}, () => console.log(this.state.materials))
        }).catch( err => {
            console.log(err)
        });
    }

    downloadInstructions(e){
        e.preventDefault();
        document.getElementById("instruction").submit();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    {this.state.courseDetails.map(courseDet =>
                        <div>
                            <h2 className="card-header">{courseDet.courseName}</h2>
                            <h5><small className="badge-success">Year &nbsp;{courseDet.year}&nbsp; semester &nbsp;{courseDet.semester}</small></h5>
                        </div>
                    )}
                </div>
                <div className="card">
                    {this.state.noticeDetails.map(noticeDet =>
                        <div>
                            <h2 className="card-header badge-info">Notices</h2>
                            <h6 className="card-header">{noticeDet.topic}</h6>
                            <h7 className="alert-info">{noticeDet.description} &nbsp;&nbsp;&nbsp;&nbsp;</h7>
                            <small className="badge-info">{noticeDet.date}</small>
                        </div>
                    )}
                </div>
                <div className="card">
                    {this.state.assignmentDetails.map(assDet =>
                        <div>
                            <h2 className="card-header badge-warning">{assDet.name}</h2>
                            <h4><a href={"http://localhost:4000/" + assDet.file.split("\\", 2)[1]}><i
                                className="fas fa-file-download"/> &nbsp;Download Instructions</a></h4>
                            <h5 className="alert-warning">you should upload a {assDet.fileToSubmit} file before &nbsp; <small className="badge-danger">{assDet.dueDate}</small></h5>
                            <FileUploader studentID={sessionStorage.getItem(STUDENT_SESSION)} assignmentID={assDet._id}/>
                        </div>
                    )}
                </div>
                <div className="card">
                    <h2 className="card-header">Module Content</h2>
                    {this.state.materials.map(materials =>
                        <div>
                            <h6 className="alert-info">Week : {materials.week} &nbsp;&nbsp;&nbsp;&nbsp;</h6>
                            <h6 className="card-header"><a href={"http://localhost:4000/" + materials.file.split("\\", 2)[1]}><i className="fas fa-file-download"/> &nbsp;{materials.lectureName}</a></h6>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default SelectedCourse;