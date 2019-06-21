import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import '../App.css';

import '../App.css'
import {NavLink} from "react-router-dom";
// import courses from './displayCourses';
import courses from '../Components/displayCourses';

export default class Courses extends Component{
    constructor(props) {
        super(props);

        this.state = {
            spec: '',
            courses: [],
            lname: '',
            year: '',
            faculty: '',
            specializations: [
                {
                    "name": "Software Engineering"
                },
                {
                    "name": "Information Technology"
                },
                {
                    "name": "Cyber Security"
                },
                {
                    "name": "Data Science"
                },
                {
                    "name": "Network Engineering"
                },
            ],
            course_leader: '',
            candidates: [],
            isModuleLeaderSelected: false,
            isSpecSelected: false,
            course_name: '',
            credits: '',
            enrol: '',
            semester: ''
        }

    }

    componentDidMount() {
        fetch('/api/resources/course/get-all-course-specs')
            .then(response => {
                return response.json();
                //  console.log("Getting to response")
            })
            .then(json => {
                this.setState({courses: json}, (() => {
                    console.log("arrays: " +this.state.courses);
                }));
                // console.log("Show error");

            })
            .catch(err => {
                this.setState({courses: err});
                // console.log("Getting to err");
                console.log('error: ' +err);
            })

        // fetch('/api/resources/resources/get-specializations')
        //     .then(response => {
        //         return response.json();
        //         //  console.log("Getting to response")
        //     })
        //     .then(json => {
        //         this.setState({specializations: json});
        //         // console.log("Show error");
        //
        //     })
        //     .catch(err => {
        //         this.setState({specializations: err});
        //         // console.log("Getting to err");
        //         console.log('error: ' +err);
        //     })
    }




    handleAddCourse(e) {
        e.preventDefault();

        fetch('api/resources/course/add-course', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "courseName": this.state.courseName,
                "year": this.state.year,
                "semester": this.state.semester,
                "courseLeader": this.state.course_leader,
                "enrollmentKey": this.state.enrollmentKey,
                "credits": this.state.credits
                }
            )

        }).then(responce => {
            return responce.json();
        })
            .then(json => {
                alert(' success ' + json)
            }).catch(err => {
                alert('Can not add ' + err)
        })

    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };

    handleCourseLeaderChange(e) {
        let course_leader = e.target.value;
        if (course_leader !== '') {
            this.setState({course_leader: course_leader, isModuleLeaderSelected: true})
        }
        else
            this.setState({isModuleLeaderSelected: false})
    };

    handleFacultyChange(e) {
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

            const com_candidates = [
                'F.O.C Perera',
                'F.O.C Silva',
                'F.O.C Rathnayake',
                'F.O.C Ediriweera'
            ];
            const bus_candidates = [
                'F.O.B Perera',
                'F.O.B Silva',
                'F.O.B Rathnayake',
                'F.O.B Ediriweera'
            ];
            const eng_candidates = [
                'F.O.E Perera',
                'F.O.E Silva',
                'F.O.E Rathnayake',
                'F.O.E Ediriweera'
            ];
            const law_candidates = [
                'F.O.L Perera',
                'F.O.L Silva',
                'F.O.L Rathnayake',
                'F.O.L Ediriweera'
            ];

            switch (faculty) {
                case 'FOC': this.setState({specializations: spec1, candidates: com_candidates})
                    break;

                case 'FOB': this.setState({specializations: spec2, candidates: bus_candidates})
                    break;

                case 'FOE': this.setState({specializations: spec3, candidates: eng_candidates})
                    break;

                case 'FOL': this.setState({specializations: spec4, candidates: law_candidates})
                    break;
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();


    }

    // handleUpdate(e) {
    //     e.preventDefault();
    //     let uname = e.target.href;
    //     let unameArray = uname.split("#", 2);
    //     let clickName = unameArray[1];
    //
    //
    //
    // }


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
                                    <a href="#add_course" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}> Course Details </a>
                                </li>
                                {/*<li className='nav-item'>*/}
                                    {/*<a href="#update_course" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Update Course Details</a>*/}
                                {/*</li>*/}

                                <li className='nav-item'>
                                    <a href="#settings" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Settings</a>
                                </li>

                                <li className='nav-item'>
                                    <a href="#courseDetails" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>View Course Details</a>
                                </li>

                            </ul>
                        </nav>
                    </div>


                </div>



                <div className='tab-content'>
                    <div className='tab-pane container active' id='add_course'>
                        <div className='card' style={{width: '100%'}}>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'> Add Course (Modules) </h3>


                            </div>
                            <form method='POST' name='add_student_form' onSubmit={e => this.handleAddCourse(e)}>
                                <div className='card-columns'>

                                    {/*fname column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="course_name">Course Name</label><span className='text-danger'>*</span>
                                                <input type="text" name='course_name' className='form-control' onChange={e => this.handleChange(e)} required/>
                                            </div>
                                        </div>
                                    </div>


                                    {/*year column*/}

                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="year">Year</label><span className='text-danger'>*</span>
                                                <select name="year" id="year" className='form-control' onChange={e => this.handleChange(e)} required>
                                                    <option value="">-----</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/*semester column*/}

                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="year">Semester</label><span className='text-danger'>*</span>
                                                <select name="semester" id="semester" className='form-control' onChange={e => this.handleChange(e)} required>
                                                    <option value="">-----</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    {/*faculty column*/}

                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<div className='form-group'>*/}
                                                {/*<label htmlFor="faculty">Faculty</label><span className='text-danger'>*</span>*/}
                                                {/*<select name="faculty" id="faculty" className='form-control' onChange={this.handleFacultyChange} required>*/}
                                                    {/*<option value="">-----</option>*/}
                                                    {/*<option value="FOC">Faculty of Computing</option>*/}
                                                    {/*<option value="FOB">Faculty of Business</option>*/}
                                                    {/*<option value="FOE">Faculty of Engineering</option>*/}
                                                    {/*<option value="FOL">Faculty of Law</option>*/}
                                                {/*</select>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*specilaization column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="spec">Specialization</label><span className='text-danger'>*</span>
                                                <select name="spec" id="spec" className='form-control' onChange={e => this.handleChange(e)} required>
                                                    <option value="">-----</option>
                                                    {this.state.specializations.map(spec =>
                                                        <option value={spec.name}>{spec.name}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/*module leader column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="course_leader">Course Head</label><span className='text-danger'>*</span>
                                                <input type="text" name='course_leader' className='form-control' onChange={e => this.handleChange(e)}/>
                                                {/*<select name="course_leader" id="course_leader" className='form-control' onChange={e => this.handleChange(e)} required>*/}
                                                    {/*<option value="">-----</option>*/}
                                                    {/*{this.state.candidates.map(cand =>*/}
                                                        {/*<option value={cand}>{cand}</option>*/}
                                                    {/*)}*/}
                                                {/*</select>*/}
                                                {this.state.isModuleLeaderSelected && <a href="#" style={{fontSize: '20px'}}>View {this.state.course_leader}</a>}
                                            </div>
                                        </div>
                                    </div>

                                    {/*Changing the course Enrolment key of the course */}

                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="enrol"> Enrolment Key </label><span className='text-danger' required>*</span>
                                                <input type="text" name='enrol' className='form-control' onChange={e => this.handleChange(e)}/>


                                            </div>
                                        </div>
                                    </div>

                                    {/*Entering Enrollment key*/}

                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="credits"> Credit Points </label><span className='text-danger' required>*</span>
                                                <input type="text" name='credits' className='form-control' onChange={e => this.handleChange(e)}/>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <button type='submit' className='btn btn-success form-control'>  Add Modules  </button>
                            </form>
                        </div>
                    </div>

                    {/*Updating Course Details*/}

                    {/*update student*/}
                    {/*<div className='tab-pane container fade' id='update_course'>*/}
                        {/*<div className='card'>*/}
                            {/*<div className='card-header bg-light'>*/}
                                {/*<h3 className='modal-header'>Update Course (Modules) details</h3>*/}
                                {/*<form className="form-inline">*/}
                                    {/*<input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search"/>*/}
                                    {/*<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>*/}
                                {/*</form>*/}
                            {/*</div>*/}
                            {/*<form method='POST' name='add_student_form' onSubmit={this.handleSubmit}>*/}
                                {/*<div className='card-columns'>*/}

                                    {/*/!*fname column*!/*/}
                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<div className='form-group'>*/}
                                                {/*<label htmlFor="course_name">Course Name</label><span className='text-danger'>*</span>*/}
                                                {/*<input type="text" name='course_name' className='form-control' onChange={this.handleChange} required/>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}


                                    {/*/!*year column*!/*/}

                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<div className='form-group'>*/}
                                                {/*<label htmlFor="year">Year</label><span className='text-danger'>*</span>*/}
                                                {/*<select name="year" id="year" className='form-control' onChange={this.handleChange} required>*/}
                                                    {/*<option value="">-----</option>*/}
                                                    {/*<option value="1">1</option>*/}
                                                    {/*<option value="2">2</option>*/}
                                                    {/*<option value="3">3</option>*/}
                                                    {/*<option value="4">4</option>*/}
                                                {/*</select>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}


                                    {/*/!*semester column*!/*/}

                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<div className='form-group'>*/}
                                                {/*<label htmlFor="year">Semester</label><span className='text-danger'>*</span>*/}
                                                {/*<select name="semester" id="semester" className='form-control' onChange={this.handleChange} required>*/}
                                                    {/*<option value="">-----</option>*/}
                                                    {/*<option value="1">1</option>*/}
                                                    {/*<option value="2">2</option>*/}
                                                {/*</select>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*/!*faculty column*!/*/}

                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<div className='form-group'>*/}
                                                {/*<label htmlFor="faculty">Faculty</label><span className='text-danger'>*</span>*/}
                                                {/*<select name="faculty" id="faculty" className='form-control' onChange={this.handleFacultyChange} required>*/}
                                                    {/*<option value="">-----</option>*/}
                                                    {/*<option value="FOC">Faculty of Computing</option>*/}
                                                    {/*<option value="FOB">Faculty of Business</option>*/}
                                                    {/*<option value="FOE">Faculty of Engineering</option>*/}
                                                    {/*<option value="FOL">Faculty of Law</option>*/}
                                                {/*</select>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*/!*specilaization column*!/*/}
                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<div className='form-group'>*/}
                                                {/*<label htmlFor="spec">Specialization</label><span className='text-danger'>*</span>*/}
                                                {/*<select name="spec" id="spec" className='form-control' onChange={this.handleChange} required>*/}
                                                    {/*<option value="">-----</option>*/}
                                                    {/*{this.state.specializations.map(spec =>*/}
                                                        {/*<option value={spec}>{spec}</option>*/}
                                                    {/*)}*/}
                                                {/*</select>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*/!*module leader column*!/*/}
                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<div className='form-group'>*/}
                                                {/*<label htmlFor="course_leader">Course Head</label><span className='text-danger'>*</span>*/}
                                                {/*<select name="course_leader" id="course_leader" className='form-control' onChange={this.handleCourseLeaderChange} required>*/}
                                                    {/*<option value="">-----</option>*/}
                                                    {/*{this.state.candidates.map(cand =>*/}
                                                        {/*<option value={cand}>{cand}</option>*/}
                                                    {/*)}*/}
                                                {/*</select>*/}
                                                {/*{this.state.isModuleLeaderSelected && <a href="#" style={{fontSize: '20px'}}>View {this.state.course_leader}</a>}*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*/!*Changing the course Enrolment key of the course *!/*/}

                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<div className='form-group'>*/}
                                                {/*<label htmlFor="course_name"> Enrolment Key </label><span className='text-danger' required>*</span>*/}
                                                {/*<input type="text" name='course_name' className='form-control'/>*/}

                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*<div className='card'>*/}
                                        {/*<div className='card-body'>*/}
                                            {/*<div className='form-group'>*/}
                                                {/*<label htmlFor="course_name"> Credit Points </label><span className='text-danger' required>*</span>*/}
                                                {/*<input type="text" name='course_name' className='form-control'/>*/}


                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                {/*</div>*/}

                                {/*<button type='submit' className='btn btn-success form-control'>  Update  </button>*/}

                                {/*<button type='submit' className='btn btn-danger '> Delete </button>*/}


                            {/*</form>*/}


                        {/*</div>*/}
                    {/*</div>*/}

                    {/*--------------------------------------------------------------------------------------------*/}

                    {/*settings*/}
                    {/*<div className='tab-pane container fade' id='settings'>*/}
                        {/*<div className='card'>*/}
                            {/*<div className='card-header bg-light'>*/}
                                {/*<h3 className='modal-header'>Change Settings</h3>*/}
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

                    {/*----------------------------------------------------------------------------------------------------------*/}



                    <div className='tab-pane container fade' id='courseDetails'>
                        <div className='card'>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'>Course Details</h3>
                            </div>
                            <div className='card-body'>

                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th>Course Name</th>
                                            <th>Year</th>
                                            <th>Semester</th>
                                            {/*<th>Faculty</th>*/}
                                            <th>Specialization</th>
                                            <th>Course Head</th>
                                            <th>Enrollment Key</th>
                                            <th>Credits</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.courses.map(course =>
                                        <tr>
                                            <td>{course.courseName}</td>
                                            <td>{course.year}</td>
                                            <td>{course.semester}</td>
                                            {/*<td>{course.faculty}</td>*/}
                                            <td>{course.specialize.name}</td>
                                            <td>{course.courseHead}</td>
                                            <td>{course.enrollmentKey}</td>
                                            <td>{course.credits}</td>
                                            <td><button type='submit' className='btn btn-primary'>Update</button></td>
                                            <td><button type='submit' className='btn btn-danger'>Remove</button></td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>




                            </div>
                        </div>


                    </div>








                    <div className='tab-pane container fade' id='settings'>
                    <div className='card'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4 className='modal-header' > Display Courses </h4>
                            </div>
                            <div>
                                <a href="displayCourses.jsx"> Display </a>
                            </div>
                        </div>
                    </div>
                    </div>

                </div>

            </div>
        );
    }
}