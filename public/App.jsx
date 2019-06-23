import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Course from "./Components/course";
import CourseModule from "./Components/courseModule";
import Profile from "./Components/profile";
import "./App.css";

import NavBar from "./Components/Navbar/navbar";
import Home from "./Components/studentHome";
import StudentRegister from "./Components/studentregister";
import UploadTest from "./Components/uploadfileto";
import StudentLogin from "./Components/studentLogin";
import EnrolledCourses from "./Components/enrolledCourses";
import Specializations from "./Components/specializations";
import AllCourses from "./Components/all_courses";
import SelectedCourse from "./Components/selectedCourse";
import ProfileRegister from "./Components/profileRegister";
import EnrollToCourse from "./Components/enroll_to_course";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        fetch('/api/messages', {method: 'GET'})
            .then(res => res.json())
            .then(jsonRes => {
                this.setState({message: jsonRes.message});
            })
            .catch(err => {
                this.setState({message: 'An error occurred'});
            });
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <NavBar/>
                    <Route path="/" component={Home} exact/>
                    <Route path="/course" component={Course}/>
                    <Route path="/selected_course" component={SelectedCourse}/>
                    <Route path="/enroll_to_course" component={AllCourses}/>
                    <Route path="/all_courses" component={AllCourses}/>
                    <Route path="/enroll_to_course" component={EnrollToCourse}/>
                    <Route path="/student_register" component={StudentRegister}/>
                    <Route path="/student_profile" component={Profile}/>
                    <Route path="/module" component={CourseModule}/>
                    <Route path="/specializations" component={Specializations} />
                    <Route path="/student_login" component={StudentLogin}/>
                    <Route path="/uploadTest" component={UploadTest}/>
                    <Route path="/profile_register" component={ProfileRegister}/>

                    <Route path="/enrolledCourses" component={EnrolledCourses}/>
                </BrowserRouter>
            </div>
        )
    }
}
