import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
const AdminConfig = require('D:\\SLIIT\\Year 3\\project work\\semester 1\\AF\\admin_af\\app\\admin.configuration\\AdminConfiguration.json');

export default class Admins extends Component{
    constructor(props) {
        super(props);

        this.state = {
            spec: '',
            name: '',
            Admin_Role: '',
            input_admin_role: '',
            role_list: [],
            admin_id: '',
            year: '',
            faculty: '',
            specializations: [],
            isSpecSelected: false,
            next_id: '',
            admins: []
        }

    }

    componentDidMount() {
        // const url = '/api/resources/admin/get-admin-roles';
        fetch('/api/resources/admin/get-admin-roles')
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({role_list: json}, (() => {
                    console.log('roles: ' + json);
                }))
            }).catch(err => {
                console.log(err);
        })

        fetch('/api/resources/admin/get-admins-with-roles')
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({admins: json}, (() => {
                    // console.log('roles: ' + json);
                }))
            }).catch(err => {
            console.log(err);
        })

        fetch('/api/resources/admin/get-next-id')
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log('next id: ' + json);
                this.setState({next_id: json})
            }).catch(err => {
                console.log('next id (error): ' + err);
                this.setState({next_id: err.message})
        })
    }

    handleChange (e)  {
        this.setState({[e.target.name]: e.target.value});
    }

    handleAddAdminLogin(e) {
        e.preventDefault();

        const id = e.target.id;
        let idParts = id.split("_", 3);
        // alert(idParts[0] + ", " + idParts[1]);

        fetch('/api/resources/admin/insert-admin-login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "admin": idParts[0],
                "username": idParts[1],
                "password": "admin"
            })
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleFacultyChange(e)  {
        let faculty = e.target.value;

        if (faculty !== '') {
            this.setState({faculty: faculty});

            const spec1 = [
                'Software Engineering',
                'Cyber Secutity',
                'Data Science',
                'Information Technology'
            ];
            const spec2 = [
                'Accounting',
                'Business Studies',
                'E_Commerce',
                'Economy'
            ];
            const spec3 = [
                'Mechanical',
                'Electircal',
                'Civil',
                'Textile'
            ];
            const spec4 = [
                'LLB',
                'forensics'
            ];

            switch (faculty) {
                case 'FOC': this.setState({specializations: spec1})
                    break;

                case 'FOB': this.setState({specializations: spec2})
                    break;

                case 'FOE': this.setState({specializations: spec3})
                    break;

                case 'FOL': this.setState({specializations: spec4})
                    break;
            }
        }
    }

    handleSubmit (e)  {
        e.preventDefault();

        fetch('/api/resources/admin/insert-admin', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "Admin_Id": AdminConfig.idPattern + this.state.next_id,
                "name": this.state.name,
                "role": this.state.Admin_Role
            })
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                alert('success: ' + json)
            }).catch(err => {
                alert('failure: ' + err)
        })

    }

    handleRoleChange (e) {
        this.setState({Admin_Role: e.target.value});
    }

    handleAdminRoleSubmit (e) {
        e.preventDefault();


        fetch('/api/resources/admin/insert-admin-role', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "role": this.state.input_admin_role
            })
        }).then(response => {
            alert(response);
        }).catch(err => {
            alert('Error: ' + err.message)
        })
    }

    handleClick (e)  {
        e.preventDefault();
        let ref = e.target.href;
        let refArray = ref.split("#", 2);       //extracting the id from the 'href'value
        let clickedId = refArray[1];

        // alert(clickedId);

        const divElem = document.getElementById(clickedId);     //getting the corresponding element with that id
        divElem.classList.remove('fade');               //removing the 'fade' class name from that element
        divElem.classList.add('active');                       //adding 'active' class name from that element

        // alert("classes : " + divElem.classList);


        //after that process is successful, we need to make sure other div elements are invisible
        const classNames = document.getElementsByClassName('tab-pane');     //getting all the elements with the given class name
        for (let divElem in classNames) {
            if (classNames[divElem].id !== undefined) {         //checking whether id is available for the given div element
                let id = classNames[divElem].id;
                if (id !== clickedId) {                     //to make sure that selected id is not the element we wish to make visible in the browser
                    classNames[divElem].classList.remove('active');
                    classNames[divElem].classList.add('fade');              //make other div elements invisible
                }
            }
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <nav className='navbar navbar-expand-lg justify-content-center bg-primary'>
                            <ul className='nav nav-tabs'>
                                <li className='nav-item'>
                                    <a href="#add_student" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Add New Admins</a>
                                </li>
                                <li className='nav-item'>
                                    <a href="#update_student" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Add New Admin Roles</a>
                                </li>
                                <li className='nav-item'>
                                    <a href="#settings" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Settings</a>
                                </li>
                            </ul>
                        </nav>
                    </div>


                </div>

                <div className='tab-content'>
                    <div className='tab-pane container active' id='add_student'>
                        <div className='card'>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'>Add New Admin</h3>
                            </div>
                            <form method='POST' name='add_student_form' onSubmit={e => this.handleSubmit(e)}>
                                <div className='card-columns'>

                                    {/*Admin Id column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="admin_id">Admin ID</label>
                                                <input type="text" name='admin_id' className='form-control' value={AdminConfig.idPattern + this.state.next_id} onChange={obj => this.handleChange(obj)} readOnly/>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Name column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="fname">Name</label><span className='text-danger'>*</span>
                                                <input type="text" name='name' className='form-control' placeholder='ishan' onChange={obj => this.handleChange(obj)} required/>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Role column  */}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="role_list">Role</label><span className='text-danger'>*</span>
                                                {/*<input type="text" name='' className='form-control' placeholder='ishan' onChange={obj => this.handleChange(obj)} required/>*/}
                                                <select name="role_list" id="role_list" className="form-control" onChange={obj => this.handleRoleChange(obj)} required>
                                                    <option value="#">----------------</option>
                                                    {this.state.role_list.map((role) =>
                                                        <option value={role._id}>{role.role}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <button type='submit' className='btn btn-success'>Submit</button>
                            </form>
                        </div>
                    </div>

                    {/*Add New Admin Role*/}
                    <div className='tab-pane container fade' id='update_student'>
                        <div className='card'>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'>Add New Admin Roles</h3>
                            </div>
                            <form method="POST" action="" name="admin_role_form" onSubmit={e => this.handleAdminRoleSubmit(e)}>
                                <div className='card-columns'>

                                    {/*Role column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="Admin_Role">Role</label><span className='text-danger'>*</span>
                                                <input type="text" name='input_admin_role' className='form-control' placeholder='Admin Role' onChange={obj => this.handleChange(obj)} required/>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <button type='submit' className='btn btn-success'>Submit</button>
                            </form>
                        </div>
                    </div>

                    {/*settings*/}
                    <div className='tab-pane container fade' id='settings'>
                        <div className='card'>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'>Settings</h3>
                            </div>
                            <div className='card-body'>
                                <div className='card-body'>
                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Admin ID</th>
                                                <th>Name</th>
                                                <th>Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.admins.map(admin =>
                                            <tr>
                                                <td>{admin.Admin_Id}</td>
                                                <td>{admin.name}</td>
                                                <td>{admin.role.role}</td>
                                                <td><button type='button' className='btn btn-success' id={admin._id + "_" + admin.Admin_Id} onClick={e => this.handleAddAdminLogin(e)}>Add</button></td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>



                                </div>
                                <button type='submit' className='btn btn-success'>Submit</button>

                            </div>
                        </div>

                        <div className='card'>
                            <div className='card-header'>
                                <h3 className='modal-header'>Current Settings</h3>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}