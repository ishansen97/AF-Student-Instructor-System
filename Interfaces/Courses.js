import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NavBar from './NavBar'
import {AxiosInstance as axios} from "axios";

class Courses extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courses: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:3000/api/instructor/courses/get-courses/')
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({courses: json}, (() => {
                    console.log('courses: ' + this.state.courses)
                }))
            })
            .catch(err => {
                console.log('error: ' + err);
            });

    }
    render() {
        return (
            <div>
                <NavBar/>

                <div className="container">
                    <h1>Courses</h1>
                    <hr/>
                    <div className="row">
                        <div className="col" style={{padding: "25px"}}>
                            <div className="card text-white bg-dark mb-3" style={{maxWidth: "60rem"}}>
                                <div className="card-header">
                                    <table className='table table-hover table-dark'>
                                        <thead>
                                            <tr>
                                                <th>Course Name</th>
                                                <th>Course Head</th>
                                                <th>Credit points</th>
                                                <th>Enrolment Key</th>
                                                <th>Year</th>
                                                <th>Semester</th>
                                                <th>View Content</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.courses.map(course =>
                                            <tr>
                                                <td>{course.courseName}</td>
                                                <td>{course.courseHead}</td>
                                                <td>{course.credits}</td>
                                                <td>{course.enrollmentKey}</td>
                                                <td>{course.year}</td>
                                                <td>{course.semester}</td>
                                                <th>
                                                    <Link to={{pathname:"/allDetails/" + course._id, courseName:course.courseName}} className="nav-link text-white ml-4">
                                                        <button type="button" className="btn btn-light">view</button></Link></th>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Courses;