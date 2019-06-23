import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

export default class Faculty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            faculty_Id: '',
            faculty_name: '',
            faculties: [],
            updateClicked: false,
            clickedId: '',
            name: ''
        }

    }

    componentDidMount() {
        fetch('/api/resources/faculty/get-next-id')
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({faculty_Id: json})
            })
            .catch(err => {
                this.setState({faculty_Id: err})
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
    }

    handleChange (e)  {
        this.setState({[e.target.name]: e.target.value});
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

    handleEdiChange(e) {
        e.preventDefault();

        this.setState({[e.target.name]: e.target.value})

    }

    handleUpdateClicked(e) {
        e.preventDefault();

        this.setState({updateClicked: true, clickedId: e.target.id});
    }


    handleEdiSubmit(e) {
        e.preventDefault();

        const button_id = e.target.id;
        const idParts = button_id.split('edit', 2);
        const spec_id = idParts[1];

        let name = document.getElementById('name' + spec_id);

        fetch('/api/resources/faculty/update-faculty/' +spec_id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "name": this.state.name,
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

    handleSubmit (e)  {
        e.preventDefault();

        fetch('/api/resources/faculty/insert-faculty', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "facultyID": this.state.faculty_Id,
                "name": this.state.faculty_name
            })
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                alert('successful')
            })
            .catch(err => {
                alert('failed: ' + err);
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
                <div className='row'>
                    <div className='col-12'>
                        <nav className='navbar navbar-expand-lg justify-content-center bg-primary'>
                            <ul className='nav nav-tabs'>
                                <li className='nav-item'>
                                    <a href="#add_student" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Add New Faculty</a>
                                </li>
                                <li className='nav-item'>
                                    <a href="#update_student" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Update Faculty</a>
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
                                <h3 className='modal-header'>Add New Faculty</h3>
                            </div>
                            <form method='POST' name='add_student_form' onSubmit={e => this.handleSubmit(e)}>
                                <div className='card-columns'>

                                    {/*Faculty Id column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="faculty_id">Faculty ID</label>
                                                <input type="text" name='faculty_id' className='form-control' placeholder={this.state.faculty_Id} value={this.state.faculty_Id} onChange={obj => this.handleChange(obj)} readOnly/>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Name column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="faculty_name">Name</label><span className='text-danger'>*</span>
                                                <input type="text" name='faculty_name' className='form-control' onChange={obj => this.handleChange(obj)} required/>
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
                                <h3 className='modal-header'>Update Faculty Details</h3>
                            </div>
                            <form method="POST" action="" name="admin_role_form" onSubmit={e => this.handleAdminRoleSubmit(e)}>
                                <div className='card-body'>
                                    <table className='table table-active'>
                                        <thead>
                                            <tr>
                                                <th>Faculty ID</th>
                                                <th>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.faculties.map(faculty =>
                                            <tr key={faculty.facultyID}>
                                                <td>
                                                    {faculty.facultyID}
                                                </td>
                                                <td>
                                                    {!(this.state.updateClicked && (this.state.clickedId === faculty.facultyID)) && faculty.name}
                                                    {(this.state.clickedId === faculty.facultyID) &&
                                                    <input type="text" className='form-control' name='name' id={'name' + faculty.facultyID} onChange={e => this.handleEdiChange(e)}/>}
                                                </td>
                                                <td>
                                                    {!(this.state.updateClicked && (this.state.clickedId === faculty.facultyID)) && <button type='button' className='btn btn-secondary' id={faculty.facultyID} onClick={e => this.handleUpdateClicked(e)}>Update</button>}
                                                    {(this.state.clickedId === faculty.facultyID) && <button type='button' className='btn btn-primary' id={'edit' + faculty.facultyID} onClick={e => this.handleEdiSubmit(e)}>Edit</button>}
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