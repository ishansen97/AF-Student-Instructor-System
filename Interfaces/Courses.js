import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NavBar from './NavBar'

class Courses extends Component {

    constructor(props) {
        super(props);
        this.state= {
            courses:[
                {
                    id :"SE3010",
                    name : "Application Frameworks"
                },
                {
                    id :"SE3020",
                    name : "Distributed Systems"
                },
                {
                    id :"SE3030",
                    name : "Software Architecture"
                }
            ]
        };
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
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-dark text-black-50">
                                            {this.state.courses.map( (item, i) =>
                                        <Link to={{pathname:"/modules",propName:item.name}} className="nav-link text-white ml-4">
                                                <h1 key={i} className="card-header"><i className="fas fa-book">&nbsp;&nbsp;</i>{item.name}</h1>
                                        </Link>
                                            )}
                                        </li>
                                    </ul>
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