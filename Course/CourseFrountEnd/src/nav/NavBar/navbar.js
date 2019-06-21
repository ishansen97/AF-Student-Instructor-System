import React, {Component} from "react";
import {Link} from "react-router-dom";



class NavBar extends Component{

    constructor(props) {
        super(props);


        this.state = {
            displayCourseMenu: false
        };

        this.showCoursedropdown = this.showCoursedropdown.bind(this);
        this.hideCoursedropdown = this.hideCoursedropdown.bind(this);

    };

    showCoursedropdown(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideCoursedropdown);
        });
    }

    hideCoursedropdown() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideCoursedropdown);
        });

    }


    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <a className="navbar-brand" href="#">

                    <img className="App-logo" src={require("../../nav/aflogo.svg")}/>
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
                            <a className="nav-link text-white ml-4" href="#">
                                <i className="fas fa-user-graduate"></i> &nbsp; Student Corner <span className="sr-only">(current)</span>
                            </a>
                        </li>

                        {/*This is where i change*/}

                        {/*To show the specialization in the database refer - 'fetching the train destinations' */}

    {/*=====================================================================================================================================*/}

                        <li className="nav-item dropdown" onClick={this.showCoursedropdown}>
                            <a className="nav-link dropdown-toggle text-white ml-4" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-book"></i> &nbsp; Specialization
                            </a>
                            {this.state.displayCourseMenu ? (
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#"> </a>
                                    <a className="dropdown-item" href="#"> </a>

                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Academic</a>
                                </div>
                            ):
                                (null)
                            }

                        </li>


                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-white ml-4" href="#">
                                <i className="fas fa-user-circle"></i> &nbsp; Profile
                            </a>
                        </li>

    {/*=====================================================================================================================================*/}

                        <li className="nav-item">
                            {/*<a className="nav-link text-white ml-4" href="displayCourses" > Courses </a>*/}

                            <Link to="/Courses" className="nav-link text-white ml-4"> Courses </Link>
                        </li>
    {/*--------------------------------------------------------------------------------------------------------------------------------------*/}

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