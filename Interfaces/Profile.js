import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NavBar from './NavBar'

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
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

    /*showEdit = () => {
        this.setState({
            showMe: !this.state.showMe
        })
    };*/

    render() {
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <h1>Profile</h1>
<hr/>
                    <div className="row">
                        <div className="col-sm" style={{padding: "25px"}}>
                            <div className="card text-white bg-secondary mb-3">
                                <div className="card-header">
                                    <h2>Instructor Details</h2>
                                </div>
                                <img className="card-img-top" src={require("./rainbow_book.jpg")}
                                     alt="ProfileImage"/>
                                <div className="card-body ">
                                      <span className="card-text">
                                           Name :
                                          Linisha
                                      </span>
                                    <br/>
                                      <span className="card-text">
                                          ID Number :
                                          Ins852406
                                      </span>
                                    <br/>
                                      <span className="card-text">
                                          NIC :
                                          924586982V
                                      </span>

                                    <br/>
                                    <span className="card-text">
                                          Faculty :
                                          Computing
                                      </span>
                                    <br/>
                                    {
                                        this.state.showMe ?
                                            <div>
                                                <div className="card-body " style={{display: "none"}}>
                                            <span>
                                                Student Password :
                                                <input className type="password" id="password" value="password"/>
                                            </span>
                                            <span>
                                                Confirm Password :
                                                <input className id="confirmPassword" type="password"/>
                                            </span>
                                            <span>
                                                Dispaly Photo :
                                            </span>
                                            <div className="previewComponent">
                                                <form>
                                                    <input className="fileInput" type="file"/>
                                                </form>

                                                <div className="imgPreview">
                                                    <div className="previewText">
                                                        Please select an Image for Preview
                                                    </div>
                                                </div>
                                                 <button className="submitButton" type="submit">Upload Image</button>
                                            </div>
                                                    <br/>
                                                    <button className="btn btn-success">Save</button>
                                                </div>
                                            </div>
                                                :null
                                     }
                                   {/* <button className="btn btn-dark" onClick={() => this.showEdit()}>Edit</button>*/}
                                </div>
                            </div>
                        </div>

                        <div className="col" style={{padding: "15px"}}>
                            <div className="card text-white bg-dark mb-3" style={{maxWidth: "60rem"}}>
                                <div className="card-header">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-dark text-black-50">
                                            {this.state.courses.map( (item, i) =>
                                                <Link to={{pathname:"/modules",propName:item.name}} className="nav-link text-white ml-4">
                                                    <h4 key={i} className="card-header"><i className="fas fa-book">&nbsp;&nbsp;</i>{item.name}</h4>
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

export default Profile;