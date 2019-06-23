import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

export default class Students extends Component{
    constructor(props) {
        super(props);

        this.state = {
            spec: '',
            fname: '',
            lname: '',
            year: '',
            faculty: '',
            specializations: [],
            isSpecSelected: false
        }

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

    handleSubmit (e)  {
        e.preventDefault();


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
                                    <a href="#add_student" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={obj => this.handleClick(obj)}>Add Students</a>
                                </li>
                                <li className='nav-item'>
                                    <a href="#update_student" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={obj => this.handleClick(obj)}>Update Students</a>
                                </li>
                                <li className='nav-item'>
                                    <a href="#settings" data-toggle="tab" className='nav-link navbar-brand text-white' onClick={obj => this.handleClick(obj)}>Settings</a>
                                </li>
                            </ul>
                        </nav>
                    </div>


                </div>

                <div className='tab-content'>
                    <div className='tab-pane container active' id='add_student'>
                        <div className='card'>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'>Add Student</h3>
                            </div>
                            <form method='POST' name='add_student_form' onSubmit={obj => this.handleSubmit(obj)}>
                                <div className='card-columns'>

                                    {/*fname column*/}
                                        <div className='card'>
                                            <div className='card-body'>
                                                <div className='form-group'>
                                                    <label htmlFor="fname">First Name</label><span className='text-danger'>*</span>
                                                    <input type="text" name='fname' className='form-control' placeholder='ishan' onChange={obj => this.handleChange(obj)} required/>
                                                </div>
                                            </div>
                                        </div>

                                        {/*lname column  */}
                                        <div className='card'>
                                            <div className='card-body'>
                                                <div className='form-group'>
                                                    <label htmlFor="lname">Last Name</label><span className='text-danger'>*</span>
                                                    <input type="text" name='lname' className='form-control' placeholder='ishan' onChange={obj => this.handleChange(obj)} required/>
                                                </div>
                                            </div>
                                        </div>

                                        {/*year column*/}
                                        <div className='card'>
                                            <div className='card-body'>
                                                <div className='form-group'>
                                                    <label htmlFor="year">Year</label><span className='text-danger'>*</span>
                                                    <select name="year" id="year" className='form-control' onChange={obj => this.handleChange(obj)} required>
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
                                                    <select name="faculty" id="faculty" className='form-control' onChange={obj => this.handleFacultyChange(obj)} required>
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
                                                    <select name="spec" id="spec" className='form-control' onChange={obj => this.handleChange(obj)} required>
                                                        <option value="">-----</option>
                                                        {this.state.specializations.map(spec =>
                                                            <option value={spec}>{spec}</option>
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

                    {/*update student*/}
                    <div className='tab-pane container fade' id='update_student'>
                        <div className='card'>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'>Update Student</h3>
                            </div>
                        </div>
                    </div>

                    {/*settings*/}
                    <div className='tab-pane container fade' id='settings'>
                        <div className='card'>
                            <div className='card-header bg-light'>
                                <h3 className='modal-header'>Settings</h3>
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