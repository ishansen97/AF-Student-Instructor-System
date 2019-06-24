import React, {Component} from "react";
import {Link} from "react-router-dom";
import {STUDENT_SESSION} from "./studentLogin";

class EnrolledCourses extends Component{
    constructor(props){
        super(props);
        this.state={
            courses : []
        }
}

    componentDidMount() {

        if(sessionStorage.getItem(STUDENT_SESSION)===null){
            alert("not logged")
            this.props.history.push("/")
        }
        fetch('api/resources/student/get_all_faculties')
            .then(response => {
                return response.json();
                //  console.log("Getting to response")
            })
            .then(json => {
                this.setState({courses: json}, (() => {
                    console.log("arrays: " + this.state.courses);
                }));
                // console.log("Show error");

            })
            .catch(err => {
                this.setState({courses: err});
                // console.log("Getting to err");
                console.log('error: ' + err);
            });
    }
    render(){
        return (
            <div>
                <div className="container-fluid">
                            <h1 className="card-header bg-dark text-white">Faculties</h1>
                            {this.state.courses.map(item =>
                                <div className="">
                                <Link style={{textDecoration:"none"}}  to={{pathname: "/specializations", moduleProps: {item}}}>
                                    <button type="button" className="btn btn-secondary btn-lg btn-block">
                                        {item.name}
                                    </button>
                                    {/*<li><i className="fas fa-book-open"*/}
                                                   {/*style={{size: "9x"}}/> &nbsp;{item.name}</li>*/}
                                </Link>
                                </div>
                            )}
                        </div>
                </div>
        );
    }
}

export default EnrolledCourses;