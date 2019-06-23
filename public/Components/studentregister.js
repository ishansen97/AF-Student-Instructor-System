import React, {Component} from 'react';

class StudentRegister extends Component{
    constructor(props) {
        super(props);
        this.state = {
            studentId:"",
            studentRegisterArray:[],
            showRegister:"none",
            userName:"",
            password:"",
            firstName:"",
            middleName:"",
            lastName:"",
            email:"",
            mobile:""
        }
    }

    onCheck(event){
        event.preventDefault();
        fetch('api/resources/student/find_student_by_id/'+this.state.studentId).then( data => {
            return data.json();
        }).then( jsonData => {
           console.log(jsonData.length);
           if(jsonData.length !== 0){
                this.setState({studentRegisterArray:jsonData}, () => {
                    this.state.studentRegisterArray.map(stddtls=>{
                        console.log(stddtls)
                        if(stddtls.studentUserName === "" || stddtls.studentUserName === null){
                            console.log("not registered")
                            this.setState({showRegister:"block"})
                        }else{
                            sessionStorage.setItem("registerID", stddtls.studentUserName);
                            this.props.history.push('/student_login')
                        }
                    })
                })
           }else {
               alert("Your cannot register. Please contact our admin")

           }
        })
        .catch( err=>{
            console.error(err);
            this.setState({showRegister: "none"});
            this.setState({disableIdInput: "disabled"});
        })
    }

    studentIDSet(e){
        this.setState({studentId:e.target.value})
    }

    userNameChange(e){
        e.preventDefault();
        this.setState({userName: e.target.value})
    }
    passwordChange(e){
        e.preventDefault();
        this.setState({password: e.target.value})
    }
    firstNameChange(e){
        e.preventDefault();
        this.setState({firstName: e.target.value})
    }
    middleNameChange(e){
        e.preventDefault();
        this.setState({middleName: e.target.value})
    }
    lastNameChange(e){
        e.preventDefault();
        this.setState({lastName: e.target.value})
    }
    emailChange(e){
        e.preventDefault();
        this.setState({email: e.target.value})
    }
    mobileChange(e){
        e.preventDefault();
        this.setState({mobile: e.target.value})
    }
    registerMe(e){
        e.preventDefault();
        console.log(this.state.userName);
        console.log(this.state.password);
        fetch('api/resources/student/update_student_login',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(
                {
                    studentID:this.state.studentId,
                    studentUserName:this.state.userName,
                    studentPassword:this.state.password
                })
        }).then(data => {
            return data.json()
        }).then(jsonData => {
            console.log(jsonData);
        }).catch(err => {
            console.log(err)
        })

        fetch('api/resources/student/add_new_student',{
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify({
                studentID: this.state.studentId,
                firstName: this.state.firstName,
                middleName: this.state.middleName,
                lastName: this.state.lastName,
                email: this.state.email,
                mobile: this.state.mobile

            })
        }).then( data => {
            return data.json()
        }).then(jsonData => {
            console.log(jsonData)
        }).catch( err => {
            console.log(err)
        })
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="card">
                    <h2 className="card-header">Registration Check</h2>
                    <input type="text" placeholder="Student ID" onChange={e => this.studentIDSet(e)} />
                    <button className="btn btn-info" onClick={e => this.onCheck(e)}>Check</button>
                </div>
                <div className="card" style={{display:this.state.showRegister}}>
                    <br/>
                    <h2 className="card-header">Register</h2>
                    <br/>
                    <div className="card">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">User Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter UserName"
                                   onChange={e => {this.userNameChange(e)}}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Password</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter Password"
                                   onChange={e => {this.passwordChange(e)}}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">First Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter First Name"
                                   onChange={e => {this.firstNameChange(e)}}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Middle Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter Middle Name"
                                   onChange={e => {this.middleNameChange(e)}}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Last Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter Last Name"
                                   onChange={e => {this.lastNameChange(e)}}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter Email"
                                   onChange={e => {this.emailChange(e)}}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Mobile Number</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter Mobile"
                                   onChange={e => {this.mobileChange(e)}}/>
                        </div>
                        <button type="submit" className="btn btn-primary"
                                onClick={e => this.registerMe(e)}>Register</button>

                    </div>
                </div>
            </div>
        )
    }
}

export default StudentRegister;