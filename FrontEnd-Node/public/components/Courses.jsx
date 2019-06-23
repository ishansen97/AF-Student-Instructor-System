import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

export default class Courses extends Component{
    constructor(props) {
        super(props);

        this.state = {
            spec: '',
            course_name: '',
            lname: '',
            year: '',
            faculty: '',
            specializations: [],
            course_leader: '',
            candidates: [],
            isModuleLeaderSelected: false,
            isSpecSelected: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCourseLeaderChange = this.handleCourseLeaderChange.bind(this);
        this.handleFacultyChange = this.handleFacultyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    handleChange (e)  {
        this.setState({[e.target.name]: e.target.value});
    }

    handleCourseLeaderChange(e)  {
        let course_leader = e.target.value;
        if (course_leader !== '') {
            this.setState({course_leader: course_leader, isModuleLeaderSelected: true})
        }
        else
            this.setState({isModuleLeaderSelected: false})
    }

    handleFacultyChange (e)  {
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

    handleSubmit(e)  {
        e.preventDefault();


    }

    handleClick(e)  {
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
                                    <a href="#add_course" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Add Course</a>
                                </li>
                                <li className='nav-item'>
                                    <a href="#update_course" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Update Course Details</a>
                                </li>
                                <li className='nav-item'>
                                    <a href="#settings" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={this.handleClick}>Settings</a>
                                </li>
                            </ul>
                        </nav>
                    </div>


                </div>

                <div className='tab-content'>
                    <div className='tab-pane container active' id='add_course'>
                        <div className='card'>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'>Add Course</h3>
                            </div>
                            <form method='POST' name='add_student_form' onSubmit={this.handleSubmit}>
                                <div className='card-columns'>

                                    {/*fname column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="course_name">Course Name</label><span className='text-danger'>*</span>
                                                <input type="text" name='course_name' className='form-control' onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                    </div>


                                    {/*year column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="year">Year</label><span className='text-danger'>*</span>
                                                <select name="year" id="year" className='form-control' onChange={this.handleChange} required>
                                                    <option value="">-----</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/*faculty column*/}

                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="faculty">Faculty</label><span className='text-danger'>*</span>
                                                <select name="faculty" id="faculty" className='form-control' onChange={this.handleFacultyChange} required>
                                                    <option value="">-----</option>
                                                    <option value="FOC">Faculty of Computing</option>
                                                    <option value="FOB">Faculty of Business</option>
                                                    <option value="FOE">Faculty of Engineering</option>
                                                    <option value="FOL">Faculty of Law</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/*specilaization column*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="spec">Specialization</label><span className='text-danger'>*</span>
                                                <select name="spec" id="spec" className='form-control' onChange={this.handleChange} required>
                                                    <option value="">-----</option>
                                                    {this.state.specializations.map(spec =>
                                                        <option value={spec}>{spec}</option>
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
                                                <select name="course_leader" id="course_leader" className='form-control' onChange={this.handleCourseLeaderChange} required>
                                                    <option value="">-----</option>
                                                    {this.state.candidates.map(cand =>
                                                        <option value={cand}>{cand}</option>
                                                    )}
                                                </select>
                                                {this.state.isModuleLeaderSelected && <a href="#" style={{fontSize: '20px'}}>View {this.state.course_leader}</a>}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <button type='submit' className='btn btn-success'>Submit</button>
                            </form>
                        </div>
                    </div>

                    {/*update student*/}
                    <div className='tab-pane container fade' id='update_course'>
                        <div className='card'>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'>Update Course details</h3>
                            </div>
                        </div>
                    </div>

                    {/*settings*/}
                    <div className='tab-pane container fade' id='settings'>
                        <div className='card'>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'>Change Settings</h3>
                            </div>
                            <div className='card-body'>
                                <div className='card-columns'>

                                    {/*faculty selection*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="faculty_select">Faculty</label>
                                                <select name="faculty_select" id="faculty_select" className='form-control'>
                                                    <option value="">-----</option>
                                                    <option value="Faculty of Computing">Faculty of Computing</option>
                                                    <option value="Faculty of Business">Faculty of Business</option>
                                                    <option value="Faculty of Engineering">Faculty of Engineering</option>
                                                    <option value="Faculty of Law">Faculty of Engineering</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Student ID setting*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="id_setting">ID starts with</label>
                                                <select name="id_setting" id="id_setting" className='form-control'>
                                                    <option value="">-----</option>
                                                    <option value="IT">IT</option>
                                                    <option value="BM">BM</option>
                                                    <option value="EN">EN</option>
                                                    <option value="LW">LW</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/*ID limit*/}
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-group'>
                                                <label htmlFor="id_limit">ID Limit</label>
                                                <input type="number" className='form-control' name='id_limit' id='id_limit'/>
                                            </div>
                                        </div>
                                    </div>
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