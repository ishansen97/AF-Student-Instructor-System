import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import SpecConfiguration from 'D:/SLIIT/Year 3/project work/semester 1/AF/admin_af/app/admin.configuration/SpecConfiguration.json';
import SideNav from "../App";

export default class Specialization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spec_id: '',
            spec_name: '',
            spec_type: '',
            no_of_years: 0,
            name: '',
            year: '',
            spec_types: SpecConfiguration.types,
            type: '',
            faculties: [],
            faculty: '',
            specializations: [],
            updateClicked: false,
            updateId: ''
        }

    }

    componentDidMount() {
        fetch('/api/resources/specialization/get-next-id')
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({spec_id: json})
            })
            .catch(err => {
                this.setState({spec_id: err})
            })

        fetch('/api/resources/faculty/get-faculties')
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({faculties: json})
            })
            .catch(err => {
                this.setState({faculties: err.message})
            })

        fetch('/api/resources/specialization/get-specialization-faculties')
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log('specs: ' + json);
                this.setState({specializations: json})
            })
            .catch(err => {
                console.log('specs (error): ' + err);
                this.setState({specializations: err.message})
            })
    }

    handleChange (e)  {
        this.setState({[e.target.name]: e.target.value});
    }

    handleUpdateClicked(e) {
        this.setState({updateClicked: true, updateId: e.target.id});

    }

    editSpec(e) {
        e.preventDefault();

        const button_id = e.target.id;
        const idParts = button_id.split('edit', 2);
        const spec_id = idParts[1];

        let name = document.getElementById('name' + spec_id);
        let year = document.getElementById('year' + spec_id);

        fetch('/api/resources/specialization/update-specialization/' +spec_id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "name": this.state.name,
                "no_of_years": Number(this.state.year),
            })
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                alert('successfully inserted');
            })
            .then(err => {
                alert('could not be inserted')
            })


    }

    handleEditSpecChange(e) {
        e.preventDefault();

        this.setState({[e.target.name]: e.target.value});
    }


    handleSubmit (e)  {
        e.preventDefault();

        fetch('/api/resources/specialization/insert-specialization', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "specializationID": this.state.spec_id,
                "name": this.state.spec_name,
                "no_of_years": Number(this.state.no_of_years),
                "type": this.state.spec_type,
                "faculty": this.state.faculty
            })
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                alert('successfully inserted');
            })
            .then(err => {
                alert('could not be inserted')
            })
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
                {/*<SideNav/>*/}
                <div className='row'>
                    <div className='col-12'>
                        <nav className='navbar navbar-expand-lg justify-content-center bg-primary'>
                            <ul className='nav nav-tabs'>
                                <li className='nav-item'>
                                    <a href="#add_student" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Add New Specialization</a>
                                </li>
                                <li className='nav-item'>
                                    <a href="#update_student" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Update Specialization</a>
                                </li>
                                {/*<li className='nav-item'>*/}
                                    {/*<a href="#settings" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Settings</a>*/}
                                {/*</li>*/}
                            </ul>
                        </nav>
                    </div>


                </div>

                <div className='tab-content'>
                    <div className='tab-pane container active' id='add_student'>
                        <div className='card'>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'>Add New Specialization</h3>
                            </div>
                            <form method='POST' name='add_student_form' onSubmit={e => this.handleSubmit(e)}>
                                <div className='card-columns'>

                                    {/*Specialization Id column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="admin_id">Specialization ID</label>
                                                <input type="text" name='spec_id' className='form-control' placeholder={this.state.spec_id} value={this.state.spec_id} onChange={obj => this.handleChange(obj)} readOnly/>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Name column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="fname">Name</label><span className='text-danger'>*</span>
                                                <input type="text" name='spec_name' className='form-control' onChange={obj => this.handleChange(obj)} required/>
                                            </div>
                                        </div>
                                    </div>

                                    {/*No of years column  */}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="no_of_years">No of Years</label><span className='text-danger'>*</span>
                                                <input type="number" name='no_of_years' className='form-control' onChange={obj => this.handleChange(obj)} required/>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Speciailization type column  */}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="spec_type">Specialization</label><span className='text-danger'>*</span>
                                                <select name="spec_type" id="spec_type" className="form-control" onChange={e => this.handleChange(e)} required>
                                                    <option value="">-------------------</option>
                                                    {this.state.spec_types.map(type =>
                                                        <option value={type.type} key={type.type}>{type.type}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Faculty column  */}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="faculty">Faculty</label><span className='text-danger'>*</span>
                                                <select name="faculty" id="faculty" className='form-control' onChange={e => this.handleChange(e)} required>
                                                    <option value="">-----------------</option>
                                                    {this.state.faculties.map(faculty =>
                                                        <option value={faculty._id} key={faculty._id}>{faculty.name}</option>
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

                    {/*Update/Delete Specializations*/}
                    <div className='tab-pane container fade' id='update_student'>
                        <div className='card'>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'>Update Specialization Details</h3>
                            </div>
                            <form method="POST" action="" name="admin_role_form" onSubmit={e => this.handleAdminRoleSubmit(e)}>
                                <div className='card-body'>
                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Specialization ID</th>
                                                <th>Name</th>
                                                <th>No of Years</th>
                                                <th>Type</th>
                                                <th>Faculty</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.specializations.map(spec =>
                                            <tr>
                                                <td>
                                                    {spec.specializationID}
                                                </td>
                                                <td>
                                                    {!(this.state.updateClicked && (this.state.updateId === spec.specializationID)) && spec.name}
                                                    {(this.state.updateId === spec.specializationID) && <input type="text" className={'form-control ' + spec.specializationID} id={'name' + spec.specializationID} name='name' onChange={e => this.handleEditSpecChange(e)}/>}
                                                </td>
                                                <td>
                                                    {!(this.state.updateClicked && (this.state.updateId === spec.specializationID)) && spec.no_of_years}
                                                    {(this.state.updateId === spec.specializationID) && <input type="text" className={'form-control ' + spec.specializationID} id={'year' +spec.specializationID} name='year' onChange={e => this.handleEditSpecChange(e)}/>}
                                                </td>
                                                <td>
                                                    {spec.type}
                                                    {/*{!(this.state.updateClicked && (this.state.updateId === spec.specializationID)) && spec.type}*/}
                                                    {/*{(this.state.updateId === spec.specializationID) && <input type="text" className={'form-control ' + spec.specializationID} id={'type' +spec.specializationID} name='type' onChange={e => this.handleEditSpecChange(e)}/>}*/}
                                                </td>
                                                <td>
                                                    {spec.faculty.name}
                                                    {/*{!(this.state.updateClicked && (this.state.updateId === spec.specializationID)) && spec.faculty.name}*/}
                                                    {/*{(this.state.updateId === spec.specializationID) && <input type="text" className={'form-control ' + spec.specializationID} id={'faculty' +spec.specializationID} name='faculty' onChange={e => this.handleEditSpecChange(e)}/>}*/}
                                                </td>
                                                <td>
                                                    {!(this.state.updateClicked && (this.state.updateId === spec.specializationID)) && <button type='button' className='btn btn-secondary' id={spec.specializationID} onClick={e => this.handleUpdateClicked(e)}>Update</button>}
                                                    {(this.state.updateId === spec.specializationID) && <button type='button' className='btn btn-primary' id={'edit' + spec.specializationID} onClick={e => this.editSpec(e)}>Edit</button>}
                                                </td>
                                                <td><button type='button' className='btn btn-danger'>Delete</button></td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>

                                <button type='submit' className='btn btn-success'>Submit</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        );
    }

}