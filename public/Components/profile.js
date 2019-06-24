import React, {Component} from "react";
import {STUDENT_SESSION} from "./studentLogin";
const SESSION_ID = "IT17098960";
class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            studentDetails:[],
            emailE:"none",
            mobileE:"none"
        }
    }

    componentDidMount() {

        if(sessionStorage.getItem(STUDENT_SESSION)===null){
            alert("not logged");
            this.props.history.push("/");
        }
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
        // alert('edit email');
        if(this.state.emailE === "none"){
            this.setState({emailE:"block"})
        }else{
            this.setState({emailE: "none"})
        }

    }

    editMobile(e){
        e.preventDefault();
        // alert('edit mobile');
        e.preventDefault();
        // alert('edit email');
        if(this.state.mobileE === "none"){
            this.setState({mobileE:"block"})
        }else{
            this.setState({mobileE: "none"})
        }
    }

    updateEmail(e){
        // e.preventDefault();
        console.log("in edit upl");
        fetch('api/resources/student/update_student_email', {
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                "studentID": sessionStorage.getItem(STUDENT_SESSION),
                "email":document.getElementById("editEmail").value
            })
        }).then( data => {
            return data.json();
        }).then( jsonData => {
            console.log(jsonData)
        }).catch( err =>{
            console.error(err);
            this.setState({mobileE: "none"});
            window.location.reload();
        })
    }
    updateMobile(e){
        // e.preventDefault();
        console.log("in edit upl");
        fetch('api/resources/student/update_student_mobile', {
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                "studentID": sessionStorage.getItem(STUDENT_SESSION),
                "mobile":document.getElementById("editMobile").value
            })
        }).then( data => {
            return data.json();
        }).then( jsonData => {
            console.log(jsonData)
        }).catch( err =>{
            console.error(err);
            this.setState({emailE: "none"});
            window.location.reload();
        })
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
                                    <h4>Student Email : {profile.email}&nbsp;
                                        <i onClick={e => this.editEmail(e)} className="fas fa-edit text-info"/>
                                    </h4>
                                    <div className="card" style={{display:this.state.emailE}}>
                                        <input type="text" id="editEmail" placeholder="Enter an Email"/> &nbsp;&nbsp;
                                        <button className="btn btn-warning" onClick={e => this.updateEmail(e)}>UPDATE</button>
                                    </div>
                                    <h4>Student Mobile : {profile.mobile}&nbsp;
                                        <i onClick={e => {this.editMobile(e)}} className="fas fa-edit text-info"/>
                                    </h4>

                                    <div className="card" style={{display:this.state.mobileE}}>
                                        <input type="text" id="editMobile" placeholder="Enter an Mobile"/> &nbsp;&nbsp;
                                        <button className="btn btn-warning" onClick={e => this.updateMobile(e)}>UPDATE</button>
                                    </div>
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