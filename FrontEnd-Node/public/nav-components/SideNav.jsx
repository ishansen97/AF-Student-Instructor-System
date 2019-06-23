import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Dialog from '../images/Dialog.png';
import {Link} from "react-router-dom";
import Authentication, {ADMINROLE, USERNAME} from "../authentication/authentication";

export default class SideNav extends Component{
    constructor(props) {
        super(props);

        this.state = {
            admin_role: ''
        }

    }

    componentDidMount() {
        this.setState({admin_role: sessionStorage.getItem(ADMINROLE)});
    }

    render() {
        return (
            <div style={{float: 'left', width: '15%', height: '1000px'}}>
                <div className='bg-dark text-white text-center'>
                    <img src={Dialog} alt=""/>
                    <h3>Admin</h3>
                </div>
                <ul className='nav flex-column bg-dark' id='sidenav'>
                    {(this.state.admin_role === 'Main') && <li className='nav-item'>
                        <Link to="/admins" className='nav-link'>
                            <i className="fas fa-user-plus navbar-brand"></i>&nbsp;  <span>Admins</span>
                        </Link>
                    </li>}
                    {/*<li className='nav-item'>*/}
                        {/*<a href="#" className='nav-link'>*/}
                            {/*<i className="fas fa-book navbar-brand"></i>&nbsp;    <span>Notices</span>*/}
                        {/*</a>*/}
                    {/*</li>*/}
                    {/*<li className='nav-item'>*/}
                        {/*<a href="#" className='nav-link'>*/}
                            {/*<i className="far fa-calendar navbar-brand"></i>&nbsp;    <span>Events</span>*/}
                        {/*</a>*/}
                    {/*</li>*/}
                    {(this.state.admin_role === 'Main') && <li className='nav-item'>
                        <Link to='/settings' className='nav-link'>
                            <i className="fas fa-tools navbar-brand"></i>&nbsp;    <span>Settings</span>
                        </Link>
                    </li>}
                    {<li className='nav-item'>
                        <Link to='/instructors' className='nav-link'>
                            <i className="fas fa-chalkboard-teacher navbar-brand"></i>&nbsp;    <span>Instructors</span>
                        </Link>
                    </li>}
                    {/*<li className='nav-item'>*/}
                        {/*<a href="#" className='nav-link'>*/}
                            {/*<i className="fas fa-bell navbar-brand"></i>&nbsp;    <span>Notifications</span>*/}
                        {/*</a>*/}
                    {/*</li>*/}
                    {(this.state.admin_role === 'Main') && <li className='nav-item'>
                        <Link to="/faculties" className='nav-link'>
                            <i className="fas fa-bell navbar-brand"></i>&nbsp;    <span>Faculties</span>
                        </Link>
                    </li>}
                    {(this.state.admin_role === 'Main') && <li className='nav-item'>
                        <Link to="/specializations" className='nav-link'>
                            <i className="fas fa-bell navbar-brand"></i>&nbsp;    <span>Specializations</span>
                        </Link>
                    </li>}
                </ul>
            </div>

        );
    }


}
