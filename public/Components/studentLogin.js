import React, {Component} from "react";

export const STUDENT_SESSION = "";

class StudentLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName:sessionStorage.getItem("registerID"),
            password:"",
            validation:[]
        }
    }

    setUserName(e){
        e.preventDefault();
        this.setState({userName: e.target.value})
    }

    setPassword(e){
        e.preventDefault();
        this.setState({password: e.target.value})
    }

    login(e){
        fetch('api/resources/student/find_student_by_username/'+this.state.userName).then( data => {
            return data.json()
        }).then( result => {
            if(result[0].studentPassword === this.state.password){
                // alert('logged in')
                sessionStorage.setItem(STUDENT_SESSION,result[0].studentID)
                this.props.history.push(`/student_home`)
            }else{
                alert("try again")
            }
        })

    }

    render(){
        return (
          <div>
              <div className="form-group">
                  <label htmlFor="exampleInputEmail1">User Name</label>
                  <input type="text" className="form-control" id="exampleInputEmail1"
                         aria-describedby="emailHelp" placeholder="Enter UserName"
                         value={this.state.userName} onChange={e => this.setUserName(e)}/>
              </div>
              <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Password</label>
                  <input type="password" className="form-control" id="exampleInputEmail1"
                         aria-describedby="emailHelp" placeholder="Enter Password"
                         onChange={e => this.setPassword(e)}/>
              </div>
              <button type="submit" className="btn btn-secondary btn-lg btn-block"
                      onClick={e => this.login(e)}>Login</button><br/>

              <a href="http://localhost:4000/student_register">Not a student?</a>
              {/*<input type="text" placeholder="Username" value={this.state.userName} onChange={e => this.setUserName(e)}/>*/}
              {/*<input type="password" placeholder="Password" onChange={e => this.setPassword(e)}/>*/}
              {/*<button onClick={e => this.login(e)}>Login</button>*/}
          </div>
        );
    }
}

export default StudentLogin;