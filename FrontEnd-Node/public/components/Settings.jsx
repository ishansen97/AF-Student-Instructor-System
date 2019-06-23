import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import StudentConfiguration from 'D:/SLIIT/Year 3/project work/semester 1/AF/admin_af/app/admin.configuration/StudentConfiguration.json';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spec_id: '',
            spec_name: '',
            no_of_years: 0,
            spec_type: '',
            faculties: [],
            faculty: '',
            specializations: [],
            password_length: 0,
            instructors: [],
            emails: [],
            header: '',
            message: ''
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

        fetch('/api/resources/specialization/get-specializations')
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

    handleChange (e)  {
        this.setState({[e.target.name]: e.target.value});
    }

    selectAll (e) {
        let checkboxes = document.getElementsByClassName('custom-checkbox');

        for (let i in checkboxes) {
            checkboxes[i].checked = true;

        }
    }

    deSelectAll (e) {
        let checkboxes = document.getElementsByClassName('custom-checkbox');

        for (let i in checkboxes) {
            checkboxes[i].checked = false;
        }
    }

    handleFacultyChange(e)  {

    }

    handleEmailSubmit(e) {
        e.preventDefault();

        fetch('/api/resources/email/send-email', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "receiver": this.state.emails,
                "subject": this.state.header,
                "message": this.refs.text.value
            })
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                alert('success');
            })
            .then(err => {
                alert('failure');
            })

    }

    getCheckBox(e) {
        let email_id = e.target.id.split("chk", 2);
        let email_location = document.getElementById(email_id[1]);
        let email = email_location.innerText;

        let emailArr = this.state.emails;
        let index = emailArr.findIndex(mail => mail === email)

        if (index > -1) {
            // alert('tyenawa bn' + index);
            emailArr.splice(1, index);
        }
        else {
            // alert('na bn' + index);
            emailArr.push(email);
        }

        this.setState({emails: emailArr});
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
                <div className='row'>
                    <div className='col-12'>
                        <nav className='navbar navbar-expand-lg justify-content-center bg-primary'>
                            <ul className='nav nav-tabs'>
                                <li className='nav-item'>
                                    <a href="#add_student" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Students</a>
                                </li>
                                <li className='nav-item'>
                                    <a href="#update_student" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Instructors</a>
                                </li>
                                {/*<li className='nav-item'>*/}
                                    {/*<a href="#settings" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Settings</a>*/}
                                {/*</li>*/}
                            </ul>
                        </nav>
                    </div>


                </div>

                <div className='tab-content'>
                    <div className='tab-pane container fade' id='add_student'>
                        {/*<div className='card'>*/}
                            {/*<div className='card-header bg-light'>*/}
                                {/*<h3 className='modal-header'>Student Credentials Settings</h3>*/}
                            {/*</div>*/}
                            {/*<form method='POST' name='add_student_form' onSubmit={e => this.handleSubmit(e)}>*/}
                                {/*<div className='card-columns'>*/}

                                    {/*/!*Username Type*!/*/}
                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<label htmlFor="username_type">Username Type</label>*/}
                                            {/*<select name="username_type" id="username_type" className='form-control'>*/}
                                                {/*<option value="">----------------</option>*/}
                                                {/*{StudentConfiguration.username_type.map(type =>*/}
                                                    {/*<option value={type.type}>{type.type}</option>*/}
                                                {/*)}*/}
                                            {/*</select>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*/!*Password*!/*/}
                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<label htmlFor="password_length">Password length</label>*/}
                                            {/*<input type="number" name='password_length' id='password_length' onChange={e => this.handleChange(e)}/>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*/!*Password characters*!/*/}
                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<label htmlFor="password_characters">Password Characters</label>*/}
                                            {/*<select name="password_characters" id="password_characters" className='form-control' onChange={e => this.handleChange(e)}>*/}
                                                {/*<option value="">---------------------</option>*/}
                                                {/*{StudentConfiguration.password_characters.map(char =>*/}
                                                    {/*<option value={char.character}>{char.character}</option>*/}
                                                {/*)}*/}
                                            {/*</select>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}

                                {/*<button type='submit' className='btn btn-success'>Submit</button>*/}
                            {/*</form>*/}
                        {/*</div>*/}

                        <div className='card' style={{marginTop: '20px'}}>
                            <div className='card-header'>
                                <h1 className='modal-header'>Email Notification</h1>
                            </div>
                            <div className='card-body'>
                                <form action="#" method="POST" onSubmit={e => this.handleEmailSubmit(e)}>
                                    <label htmlFor="header" className='h3'>Header</label>
                                    <input type="text" className='form-control' name='header' onChange={e => this.handleChange(e)} required/>
                                    <label htmlFor="message" className='h3'>Body</label>
                                    <textArea cols="40" rows="5" ref='text' name="message" className='form-control' placeholder="type your message here" onChange={e => this.handleChange(e)} required></textArea>
                                    <button type='button' className='btn btn-primary' onClick={e => this.selectAll(e)}>Select All</button>
                                    <button type='button' className='btn btn-danger' onClick={e => this.deSelectAll(e)}>DeSelect All</button>
                                    <table className='table table-striped'>
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>Student ID</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Faculty</th>
                                            <th>Specialization</th>
                                            <th>Email</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                    <button type='submit' className='btn btn-success'>Send</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/*Instructor Credentials Settings*/}
                    <div className='tab-pane container active' id='update_student'>
                        {/*<div className='card'>*/}
                            {/*<div className='card-header bg-light'>*/}
                                {/*<h3 className='modal-header'>Instructor Credentials Settings</h3>*/}
                            {/*</div>*/}
                            {/*<form method="POST" action="" name="admin_role_form" onSubmit={e => this.handleAdminRoleSubmit(e)}>*/}
                                {/*<div className='card-columns'>*/}

                                    {/*/!*Username Type*!/*/}
                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<label htmlFor="username_type">Username Type</label>*/}
                                            {/*<select name="username_type" id="username_type" className='form-control'>*/}
                                                {/*<option value="">----------------</option>*/}
                                                {/*{StudentConfiguration.username_type.map(type =>*/}
                                                    {/*<option value={type.type}>{type.type}</option>*/}
                                                {/*)}*/}
                                            {/*</select>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*/!*Password*!/*/}
                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<label htmlFor="password_length">Password length</label>*/}
                                            {/*<input type="number" name='password_length' id='password_length' onChange={e => this.handleChange(e)}/>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*/!*Password characters*!/*/}
                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<label htmlFor="password_characters">Password Characters</label>*/}
                                            {/*<select name="password_characters" id="password_characters" className='form-control' onChange={e => this.handleChange(e)}>*/}
                                                {/*<option value="">---------------------</option>*/}
                                                {/*{StudentConfiguration.password_characters.map(char =>*/}
                                                    {/*<option value={char.character}>{char.character}</option>*/}
                                                {/*)}*/}
                                            {/*</select>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}


                                {/*<button type='submit' className='btn btn-success'>Submit</button>*/}
                            {/*</form>*/}
                        {/*</div>*/}

                        <div className='card' style={{marginTop: '20px'}}>
                            <div className='card-header'>
                                <h1 className='modal-header'>Email Notification</h1>
                            </div>
                            <div className='card-body'>
                                <form action="#" method="POST" onSubmit={e => this.handleEmailSubmit(e)}>
                                    <label htmlFor="header" className='h3'>Header</label>
                                    <input type="text" className='form-control' name='header' onChange={e => this.handleChange(e)} required/>
                                    <label htmlFor="message" className='h3'>Body</label>
                                    <textArea cols="40" rows="5" ref='text' name="message" className='form-control' placeholder="type your message here" onchange={e => this.handleChange(e)} required></textArea>
                                    <button type='button' className='btn btn-primary' onClick={e => this.selectAll(e)}>Select All</button>
                                    <button type='button' className='btn btn-danger' onClick={e => this.deSelectAll(e)}>DeSelect All</button>
                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th></th>
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
                                                <td><input type="checkbox" className='custom-checkbox' id={'chk' + instructor.Instructor_Id} onClick={e => this.getCheckBox(e)}/></td>
                                                <td>{instructor.Instructor_Id}</td>
                                                <td>{instructor.firstName}</td>
                                                <td>{instructor.lastName}</td>
                                                <td>{instructor.faculty.name}</td>
                                                <td id={instructor.Instructor_Id}>{instructor.email}</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                    <button type='submit' className='btn btn-success'>Send</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        );
    }

}