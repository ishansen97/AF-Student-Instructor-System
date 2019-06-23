import React, {Component} from "react";
import {STUDENT_SESSION} from "./studentLogin";
const SESSION_ID = "IT17098960";
class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            studentDetails:[]
        }
    }

    componentDidMount() {
        fetch('api/resources/student/find_student_by_student_id/'+sessionStorage.getItem(STUDENT_SESSION)).then(data => {
            return data.json();
        }).then(jsonData => {
            this.setState({studentDetails: jsonData}, ()=>{
                console.log(this.state.studentDetails)
            })
        })
    }

    editEmail(e){
        e.preventDefault();
        alert('edit email');
    }

    editMobile(e){
        e.preventDefault();
        alert('edit mobile');
    }

    render() {
        return(
            <div className="container">
                <div className="card">
                    <h2 className="card-header">Student Profile</h2><br/>
                    <div className="row">
                        <div className="col-sm-3">
                            <i className="fas fa-user-alt fa-7x"/>
                        </div>
                        <div className="col card" style={{textAlign:"left"}}>
                            {this.state.studentDetails.map(profile=>
                                <div>
                                    <h4>Student ID : {profile.studentID}</h4>
                                    <h4>Student Name : {profile.firstName} {profile.middleName} {profile.lastName}</h4>
                                    <h4>Student Email : {profile.email}&nbsp;<i onClick={e => this.editEmail(e)} className="fas fa-edit text-info"/></h4>
                                    <h4>Student Mobile : {profile.mobile}&nbsp;<i onClick={e => {this.editMobile(e)}} className="fas fa-edit text-info"/></h4>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Profile;