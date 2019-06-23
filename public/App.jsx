import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from '../Interfaces/Home'
import NavBar from '../Interfaces/NavBar'
import Profile from '../Interfaces/Profile'
import Courses from "../Interfaces/Courses";
import Notifications from "../Interfaces/Notifications";
import InstructorCorner from "../Interfaces/InstructorCorner";
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Assignments from "../Interfaces/Views/Assignments";
import Exams from "../Interfaces/Views/Exams";
import Notices from "../Interfaces/Views/Notices";
import Results from "../Interfaces/Views/Results";
import Materials from "../Interfaces/Views/Materials";
import AllDetails from "../Interfaces/Views/AllDetails";
import ViewAnswers from "../Interfaces/Views/ViewAnswers";


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
       /* return <h2>{this.state.message}</h2>;*/
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/navbar" component={NavBar}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/courses" component={Courses}/>
                        <Route path="/notifications" component={Notifications}/>
                        <Route path="/instructorCorner" component={InstructorCorner}/>
                        <Route path='/assignments' component={Assignments}/>
                        <Route path='/exams' component={Exams}/>
                        <Route path='/notices' component={Notices}/>
                        <Route path='/results' component={Results}/>
                        <Route path='/materials' component={Materials}/>
                        <Route path='/allDetails/:course' component={AllDetails}/>
                        <Route path='/viewAnswers' component={ViewAnswers}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}
