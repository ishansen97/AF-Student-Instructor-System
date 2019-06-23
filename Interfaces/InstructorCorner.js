import React, {Component} from 'react';
import NavBar from './NavBar'
import {Link} from "react-router-dom";

class InstructorCorner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
        }
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className="container" style={{align: "center"}}>
                    <h1>Instructor Corner</h1>
                    <hr/>
                    <div className="row">
                        <div className="col-sm" style={{padding: "10px"}}>
                            <div className="card border-dark mb-3" style={{maxWidth: "18rem"}}>
                                <div className="card-header">Notices</div>
                                <div className="card-body">
                                    <h5 className="card-title">Add notices</h5>
                                    <Link to="/notices" className="nav-link text-white ml-4">
                                        <button type="button" className="btn btn-outline-dark">ADD</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-sm" style={{padding: "10px"}}>
                                <div className="card border-dark mb-3" style={{maxWidth: "18rem"}}>
                                <div className="card-header">Materials</div>
                                <div className="card-body">
                                    <h5 className="card-title">Add Materials</h5>
                                    <Link to="/materials" className="nav-link text-white ml-4">
                                        <button type="button" className="btn btn-outline-dark">ADD</button>
                                    </Link>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm" style={{padding: "10px"}}>
                                <div className="card border-dark mb-3" style={{maxWidth: "18rem"}}>
                                <div className="card-header">Assignments</div>
                                <div className="card-body">
                                    <h5 className="card-title">Add Assignments</h5>
                                    <Link to="/assignments" className="nav-link text-white ml-4">
                                        <button type="button" className="btn btn-outline-dark">ADD</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-sm" style={{padding: "10px"}}>
                                <div className="card border-dark mb-3" style={{maxWidth: "18rem"}}>
                                <div className="card-header">Exams</div>
                                <div className="card-body">
                                    <h5 className="card-title">Add Exams</h5>
                                    <Link to="/exams" className="nav-link text-white ml-4">
                                        <button type="button" className="btn btn-outline-dark">ADD</button>
                                    </Link>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm" style={{padding: "10px"}}>
                            <div className="card border-dark mb-3" style={{maxWidth: "18rem"}}>
                                <div className="card-header">Results</div>
                                <div className="card-body">
                                    <h5 className="card-title">Add Results</h5>
                                    <Link to="/results" className="nav-link text-white ml-4">
                                        <button type="button" className="btn btn-outline-dark">ADD</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-sm" style={{padding: "10px"}}>
                                <div className="card border-dark mb-3" style={{maxWidth: "18rem"}}>
                                    <div className="card-header">View Answers</div>
                                    <div className="card-body">
                                        <h5 className="card-title">View Uploaded Answers</h5>
                                        <Link to="/viewAnswers" className="nav-link text-white ml-4">
                                            <button type="button" className="btn btn-outline-dark">View</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstructorCorner;