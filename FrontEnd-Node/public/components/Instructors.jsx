import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import {ADMINROLE} from "../authentication/authentication";

export default class Instructors extends Component{
    constructor(props) {
        super(props);

        this.state = {
            spec: '',
            Instructor_Id: '',
            fname: '',
            lname: '',
            age: '',
            faculty: '',
            specializations: [],
            faculties: [],
            isSpecSelected: false,
            instructors: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // this.handleFacultyChange = this.handleFacultyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddInstructorLogin = this.handleAddInstructorLogin.bind(this);

    }

    componentDidMount() {
        fetch('/api/resources/instructor/get-next-id')
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({Instructor_Id: json})
            })
            .catch(err => {
                this.setState({Instructor_Id: err})
            })

        fetch('/api/resources/faculty/get-faculties')
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({faculties: json})
            })
            .catch(err => {
                this.setState({faculties: err})
            })

        fetch('/api/resources/instructor/get-instructors-faculties')
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log('specs: ' + json);
                this.setState({instructors: json})
            })
            .catch(err => {
                console.log('specs (error): ' + err);
                this.setState({instructors: err.message})
            })
    }

    handleChange(e)  {
        this.setState({[e.target.name]: e.target.value});
    }

    getCheckBox(e) {
        let email_id = e.target.id.split("chk", 2);
        let email_location = document.getElementById(email_id[1]);
        let email = email_location.innerText;

        let emailArr = this.state.emails;
        let index = emailArr.findIndex(mail => mail === email)

        if (index > -1) {
            alert('tyenawa bn' + index);
            emailArr.splice(1, index);
        }
        else {
            alert('na bn' + index);
            emailArr.push(email);
        }

        this.setState({emails: emailArr});
    }

    handleAddInstructorLogin(e) {
        e.preventDefault();

        const id = e.target.id;
        let idParts = id.split("_", 3);
        // alert(idParts[0] + ", " + idParts[1]);

        fetch('/api/resources/instructor/insert-instructor-login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "instructor": idParts[0],
                "username": idParts[1],
                "password": "123"
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

    handleSubmit(e) {
        e.preventDefault();

        fetch('/api/resources/instructor/insert-instructor', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "Instructor_Id": this.state.Instructor_Id,
                "firstName": this.state.fname,
                "lastName": this.state.lname,
                "age": this.state.age,
                "email": this.state.email,
                "faculty": this.state.faculty
            })
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                alert('successful')
            })
            .catch(err => {
                alert('failure')
            })

    }

    handleClick(e) {
        e.preventDefault();
        let ref = e.target.href;
        let refArray = ref.split("#", 2);       //extracting the id from the 'href'value
        let clickedId = refArray[1];

        const divElem = document.getElementById(clickedId);     //getting the corresponding element with that id
        divElem.classList.remove('fade');               //removing the 'fade' class name from that element
        divElem.classList.add('active');                       //adding 'active' class name from that element


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
                                    <a href="#add_instructor" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Add Instructors</a>
                                </li>
                                <li className='nav-item'>
                                    <a href="#update_instructor" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Update Instructors</a>
                                </li>
                                {/*<li className='nav-item'>*/}
                                    {/*<a href="#settings" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Settings</a>*/}
                                {/*</li>*/}
                            </ul>
                        </nav>
                    </div>


                </div>

                <div className='tab-content'>
                    <div className='tab-pane container active' id='add_instructor'>
                        <div className='card'>
                            <div className='card-header'>
                                <h3 className='modal-header'>Add Instructor</h3>
                            </div>
                            <form method='POST' name='add_student_form' onSubmit={e => this.handleSubmit(e)}>
                                <div className='card-columns'>

                                    {/*Instructor Id column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="Instructor_Id">Instructor Id</label><span className='text-danger'>*</span>
                                                <input type="text" name='Instructor_Id' className='form-control' placeholder={this.state.Instructor_Id} value={this.state.Instructor_Id} onChange={e => this.handleChange(e)} readOnly/>
                                            </div>
                                        </div>
                                    </div>

                                    {/*fname column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="fname">First Name</label><span className='text-danger'>*</span>
                                                <input type="text" name='fname' className='form-control' placeholder='ishan' onChange={e => this.handleChange(e)} required/>
                                            </div>
                                        </div>
                                    </div>

                                    {/*lname column  */}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="lname">Last Name</label><span className='text-danger'>*</span>
                                                <input type="text" name='lname' className='form-control' placeholder='ishan' onChange={e => this.handleChange(e)} required/>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Age column  */}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="age">Age</label><span className='text-danger'>*</span>
                                                <input type="number" name='age' className='form-control' onChange={e => this.handleChange(e)} required/>
                                            </div>
                                        </div>
                                    </div>

                                    {/*faculty column*/}

                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="faculty">Faculty</label><span className='text-danger'>*</span>
                                                <select name="faculty" id="faculty" className='form-control' onChange={e => this.handleChange(e)} required>
                                                    <option value="">-------</option>
                                                    {this.state.faculties.map(faculty => {
                                                        let faculties = faculty.name.split("Faculty of ", 2);

                                                        if (faculties[1] === sessionStorage.getItem(ADMINROLE)) {
                                                            return <option value={faculty._id}
                                                                           key={faculty._id}>{faculty.name}</option>
                                                        }
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/*specilaization column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="spec">Email</label><span className='text-danger'>*</span>
                                                <input type="email" name="email" className="form-control" onChange={e => this.handleChange(e)} required/>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <button type='submit' className='btn btn-success'>Submit</button>
                            </form>
                        </div>
                    </div>

                    {/*update student*/}
                    <div className='tab-pane container fade' id='update_instructor'>
                        <div className='card'>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'>Update Instructor Details</h3>
                            </div>
                            <div className='card-body'>
                                <form action="">
                                    <table className='table table-striped'>
                                        <thead>
                                        <tr>
                                            <th>Instructor ID</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Faculty</th>
                                            <th>Email</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.instructors.map(instructor =>
                                            <tr>
                                                {/*<td><input type="checkbox" className='custom-checkbox' id={'chk' + instructor.Instructor_Id} onClick={e => this.getCheckBox(e)}/></td>*/}
                                                <td>{instructor.Instructor_Id}</td>
                                                <td>{instructor.firstName}</td>
                                                <td>{instructor.lastName}</td>
                                                <td>{instructor.faculty.name}</td>
                                                <td id={instructor.Instructor_Id}>{instructor.email}</td>
                                                <td><button type='submit' className='btn btn-success' id={instructor._id + "_" + instructor.email} onClick={e => this.handleAddInstructorLogin(e)}>Add</button></td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/*settings*/}
                    {/*<div className='tab-pane container fade' id='settings'>*/}
                        {/*<div className='card'>*/}
                            {/*<div className='card-header bg-light'>*/}
                                {/*<h3 className='modal-header'>Settings</h3>*/}
                            {/*</div>*/}
                            {/*<div className='card-body'>*/}
                                {/*<div className='card-columns'>*/}

                                    {/*/!*faculty selection*!/*/}
                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<div className='form-group'>*/}
                                                {/*<label htmlFor="faculty_select">Faculty</label>*/}
                                                {/*<select name="faculty_select" id="faculty_select" className='form-control'>*/}
                                                    {/*<option value="">-----</option>*/}
                                                    {/*<option value="Faculty of Computing">Faculty of Computing</option>*/}
                                                    {/*<option value="Faculty of Business">Faculty of Business</option>*/}
                                                    {/*<option value="Faculty of Engineering">Faculty of Engineering</option>*/}
                                                    {/*<option value="Faculty of Law">Faculty of Engineering</option>*/}
                                                {/*</select>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*/!*Student ID setting*!/*/}
                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<div className='form-group'>*/}
                                                {/*<label htmlFor="id_setting">ID starts with</label>*/}
                                                {/*<select name="id_setting" id="id_setting" className='form-control'>*/}
                                                    {/*<option value="">-----</option>*/}
                                                    {/*<option value="IT">IT</option>*/}
                                                    {/*<option value="BM">BM</option>*/}
                                                    {/*<option value="EN">EN</option>*/}
                                                    {/*<option value="LW">LW</option>*/}
                                                {/*</select>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*/!*ID limit*!/*/}
                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<div className='form-group'>*/}
                                                {/*<label htmlFor="id_limit">ID Limit</label>*/}
                                                {/*<input type="number" className='form-control' name='id_limit' id='id_limit'/>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<button type='submit' className='btn btn-success'>Submit</button>*/}

                            {/*</div>*/}
                        {/*</div>*/}

                        {/*<div className='card'>*/}
                            {/*<div className='card-header'>*/}
                                {/*<h3 className='modal-header'>Current Settings</h3>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>

            </div>
        );
    }
}