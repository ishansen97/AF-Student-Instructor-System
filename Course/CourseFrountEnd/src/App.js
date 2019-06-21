import React, {Component} from 'react';

import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


import NavBar from './nav/NavBar/navbar.js';


import Courses from './Components/Courses';
import DisplayCourses from './Components/displayCourses';



class App extends Component {
  render() {
    return(
        <Router>
            <NavBar/>
            <Switch>
                <Route path='/Courses' exact component={Courses}/>
                <Route path='/displayCourses' component={DisplayCourses}/>
            </Switch>
        </Router>
    )
  }
}

export default App;
