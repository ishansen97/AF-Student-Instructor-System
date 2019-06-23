import React, {Component} from "react";
import {Link} from "react-router-dom";

class EnrolledCourses extends Component{
    constructor(props){
        super(props);
        this.state={
            courses : []
        }
}

    componentDidMount() {
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
                            <h1>Faculties</h1>
                            <hr/>
                            {this.state.courses.map(item =>
                                <div className="card-header alert-dark">
                                <Link to={{pathname: "/specializations", moduleProps: {item}}}>
                                    <li><i className="fas fa-book-open"
                                                   style={{size: "9x"}}/> &nbsp;{item.name}</li>
                                </Link>
                                </div>
                            )}
                        </div>
                </div>
        );
    }
}

export default EnrolledCourses;