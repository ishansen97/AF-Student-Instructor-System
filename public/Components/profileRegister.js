import React, {Component} from 'react';

class ProfileRegister extends Component{
    constructor(props) {
        super(props);
        this.state = {
            studentID:sessionStorage.getItem("studentID"),
            firstName:"",
            middleName:"",
            lastName:"",
            email:"",
            mobile:""
        }
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="card">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">First Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Middle Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Last Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Mobile Number</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>

                </div>
            </div>
        )
    }

}
export default ProfileRegister;