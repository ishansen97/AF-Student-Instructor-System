import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {STUDENT_SESSION} from "../studentLogin";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logout:"none"
        }
    }

    componentDidMount() {
        if(sessionStorage.getItem(STUDENT_SESSION)!==null){
            this.setState({logout:"block"})
        }else{
            this.setState({logout:"none"})
        }
    }

    signOut(e){
        e.preventDefault();
        sessionStorage.removeItem(sessionStorage.getItem(STUDENT_SESSION));
        sessionStorage.clear();
        alert('signed out' + sessionStorage.getItem(STUDENT_SESSION));
        this.props.history.push("/");
        window.location.reload();
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary sticky-top">
                <Link to="/student_home" className="navbar-brand" href="#">
                    <img className="App-logo" src={require("../../images/aflogo.svg")} alt="navLogo"/>
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
                        {/*<li className="nav-item active">*/}
                            {/*<Link to="/student_register" className="nav-link text-white ml-4">*/}
                                {/*<i className="fas fa-user-graduate"></i> &nbsp; Student Register/Login<span*/}
                                {/*className="sr-only">(current)</span>*/}
                            {/*</Link>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <Link to="/enrolledCourses" className="nav-link text-white ml-4">
                                <i className="fas fa-book"></i> &nbsp; Courses
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/student_profile" className="nav-link text-white ml-4">
                                <i className="fas fa-user-circle"></i> &nbsp; Profile
                            </Link>
                        </li>

                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        {/*<input className="form-control mr-sm-2" type="search" placeholder="Search"*/}
                               {/*aria-label="Search"></input>*/}
                        <button style={{display:this.state.logout}} className="btn btn-outline-dark my-2 my-sm-0" type="submit" onClick={e => this.signOut(e)}>Logout</button>
                    </form>
                </div>
            </nav>
        )
    }
}

export default NavBar;