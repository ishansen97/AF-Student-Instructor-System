import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import Authentication, {USERNAME} from "../authentication/authentication";

export default class Profile extends Component{
    constructor(props) {
        super(props);

        this.state = {
            admins: [],
            adminLogin: [],
            admin_id: '',
            name: '',
            editClicked: false,
            editCredentialClicked: false,
            username: '',
            password: ''
        }

    }

    componentDidMount() {
        fetch('api/resources/admin/get-admin-with-role/' + sessionStorage.getItem(USERNAME))
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({admins: json})
            })
            .catch(err => {
                console.log('error: ' + err);
            })

        fetch('api/resources/admin/get-admin-login/' + sessionStorage.getItem(USERNAME))
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({adminLogin: json}, (() => {
                    console.log('logins: ' + this.state.adminLogin);
                }))
            })
            .catch(err => {
                console.log('error: ' + err);
            })
    }

    handleEditClick(e) {
        e.preventDefault();

        this.setState({admin_id: e.target.id, editClicked: true})
    }

    handleCredentialEditClick(e) {
        e.preventDefault();

        this.setState({username: e.target.id, editCredentialClicked: true})
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleUpdateSubmit(e) {
        e.preventDefault();

        fetch('/api/resources/admin/update-admin/' + sessionStorage.getItem(USERNAME), {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "name": this.state.name
            })
        })
            .then(response => {
                alert(response);
            })
            .catch(err => {
                alert('error: ' + err)
            })
    }

    handleUpdateCredentialSubmit(e) {
        e.preventDefault();

        Authentication.updatePassword(this.state.username, this.state.password)
            .then(json => {
                alert('password has been successfully updated');
            })
            .catch(err => {
                alert('password could not be updated');
            })
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='card' style={{margin: 'auto', width: '60%'}}>
                        <div className='card-header'>
                            <h1 className='modal-header'>My Profile</h1>
                        </div>
                        <div className='card-body'>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Admin Id</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.admins.map(admin =>
                                    <tr>
                                        <td>{admin.Admin_Id}</td>
                                        <td>
                                            {!(this.state.editClicked && (this.state.admin_id === admin.Admin_Id)) && admin.name}
                                            {(this.state.admin_id === admin.Admin_Id) && <input type="text" className='form-control' name='name' onChange={e => this.handleChange(e)}/>}
                                        </td>
                                        <td>{admin.role.role}</td>
                                        <td>
                                            {!(this.state.editClicked && (this.state.admin_id === admin.Admin_Id)) && <button type='button' className='btn btn-primary' id={admin.Admin_Id} onClick={e => this.handleEditClick(e)}>Edit</button>}
                                            {(this.state.admin_id === admin.Admin_Id) && <button type='button' className='btn btn-success' onClick={e => this.handleUpdateSubmit(e)}>Update</button>}
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/*my credentials*/}
                <div className='row'>
                    <div className='card' style={{margin: 'auto', width: '60%'}}>
                        <div className='card-header'>
                            <h1 className='modal-header'>My Credentials</h1>
                        </div>
                        <div className='card-body'>
                            <table className='table table-striped'>
                                <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.adminLogin.map(admin =>
                                    <tr>
                                        <td>{admin.username}</td>
                                        <td>
                                            {!(this.state.editCredentialClicked && (this.state.username === admin.username)) && admin.password}
                                            {(this.state.username === admin.username) && <input type="text" className='form-control' name='password' onChange={e => this.handleChange(e)}/>}
                                        </td>
                                        <td>
                                            {!(this.state.editCredentialClicked && (this.state.username === admin.username)) && <button type='button' className='btn btn-primary' id={admin.username} onClick={e => this.handleCredentialEditClick(e)}>Edit</button>}
                                            {(this.state.username === admin.username) && <button type='button' className='btn btn-success' onClick={e => this.handleUpdateCredentialSubmit(e)}>Update</button>}
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}