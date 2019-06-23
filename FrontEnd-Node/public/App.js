import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from './nav-components/navbar';
import MainAdmin from './components/MainAdmin';
import SideNav from './nav-components/SideNav';
import './App.css';
import Students from "./components/Students";
import Courses from './components/Courses';
import Instructors from './components/Instructors';
import Admins from './components/Admins';
import Faculty from './components/Faculty';
import Specialization from './components/Specialization';
import Settings from './components/Settings';
import Login from './components/Login';
import AuthenticationRoute from './authentication/AuthenticationRoute';
import Profile from './components/Profile';

class App extends Component{

    render() {
        return (
            <Router>
                <NavBar/>
                <SideNav/>
                <Switch>
                    <AuthenticationRoute path='/' exact component={Login} />
                    <AuthenticationRoute path='/main' component={MainAdmin} />
                    <AuthenticationRoute path='/students' component={Students}/>
                    <AuthenticationRoute path='/courses' component={Courses}/>
                    <AuthenticationRoute path='/instructors' component={Instructors}/>
                    <AuthenticationRoute path='/admins' component={Admins}/>
                    <AuthenticationRoute path='/faculties' component={Faculty}/>
                    <AuthenticationRoute path='/specializations' component={Specialization}/>
                    <AuthenticationRoute path='/settings' component={Settings}/>
                    <AuthenticationRoute path='/profile' component={Profile}/>
                </Switch>
            </Router>
        );

    }
}

export default App;
