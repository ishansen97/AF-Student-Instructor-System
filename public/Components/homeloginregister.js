import React, {Component} from "react";
import {Link} from "react-router-dom";

class HomeLoginregister extends Component{
    render() {
        return (
            <div className="container-fluid" style={{height:"100%"}}>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1 className="card-header bg-dark text-white">WELCOME !</h1>
                <div className="">
                    <Link style={{textDecoration:"none"}} to="/student_login">
                        <button type="button" className="btn btn-secondary btn-lg btn-block">
                            Login
                        </button>
                    </Link>
                    <div className="">
                        <Link style={{textDecoration:"none"}} to="/student_register">
                            <button type="button" className="btn btn-secondary btn-lg btn-block">
                                Register
                            </button>
                        </Link>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                {/*<div className="card">*/}
                    {/*<Link to="/student_login"><button className="btn btn-info">Login</button></Link>*/}
                    {/*<Link to="/student_register"><button className="btn btn-info">Register</button></Link>*/}
                {/*</div>*/}
            </div>
        );
    }

}
export default HomeLoginregister;