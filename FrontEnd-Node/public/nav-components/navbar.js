import React, {Component} from "react";
// import ReactDom from 'react-dom';
// import Students from '../components/Students';
import {Link, Router, Route} from "react-router-dom";
import Aflogo from '../aflogo.svg';
import "bootstrap/dist/css/bootstrap.css";
import '../App.css';
import Authentication from '../authentication/authentication';
import Students from "../components/Students";

class NavBar extends Component{

    signOut(e) {
        e.preventDefault();

        // Authentication.bind(this);

        // Authentication.clearSession();
        sessionStorage.clear();
        this.props.history.push(`/`);
    }

    render(){
        return(
                <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                    <a className="navbar-brand" href='#'>
                        <img className="App-logo" src={Aflogo}/>
                    </a>
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
                                <Link className="nav-link text-white ml-4" to='/students'>
                                    <i className="fas fa-user-graduate"></i> &nbsp; Student Corner <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white ml-4" to='/courses'>
                                    <i className="fas fa-book"></i> &nbsp; Courses
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/profile' className="nav-link text-white ml-4" >
                                    <i className="fas fa-user-circle"></i> &nbsp; Profile
                                </Link>
                            </li>
                            {Authentication.isLoggedIn()&& <li className="nav-item">
                                <a href='#' className="nav-link text-white ml-4" onClick={e => this.signOut(e)}>
                                    <i className="fas fa-sign-out-alt"></i> &nbsp; Sign Out
                                </a>
                            </li>}

                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
        )
    }
}

export default NavBar;