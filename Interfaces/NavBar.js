import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-secondary sticky-top">
                    <Link to="/" className="navbar-brand" href="#">
                        <img className="App-logo" src={require("./aflogo.svg")} alt="navLogo"/>
                    </Link>
                    <button className="navbar-toggler"
                            type="button"

                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto">
                            <li className="nav-item active">
                                <Link to="/instructorCorner" className="nav-link text-white ml-4">
                                    <i className="fas fa-user-graduate"></i> &nbsp; Instructor Corner <span
                                    className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/courses" className="nav-link text-white ml-4">
                                    <i className="fas fa-book"></i> &nbsp; Courses
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link text-white ml-4">
                                    <i className="fas fa-user-circle"></i> &nbsp; Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/notifications" className="nav-link text-white ml-4">
                                    <i className="fas fa-bell"></i> &nbsp; Notifications
                                </Link>
                            </li>

                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search"></input>
                            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar;