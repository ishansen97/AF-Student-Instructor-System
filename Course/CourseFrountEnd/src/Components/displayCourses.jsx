import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'

import divWithClassName from "react-bootstrap/es/utils/divWithClassName";
// import 'react-bootstrap/Card';
// import 'bootstrap';



export default class displayCourses extends Component{

    constructor(props){
        super(props);

        this.state = {
            degrees: [
                'Computing',
                'BS',
                'Law',
                'Engineering'
            ],
            Computing_courses: [
                'SE',
                'CS',
                'DS',   //Not Available
                'IS'    //Not Available
            ],
            BS_courses: [
                'Business Management',
                'Accounting Finance',   //Not Available
                'Business Analysis',
                'Marketing Management'  //Not Available
            ],
            Law_courses: [
                'LLB (Hons) Law',
                'Bachelor of Science (Hons) Quantity Surveying',    //Not Available
                'Bachelor of Science (Hons) Architecture',          //Not Available
                'BSc (Hons) Psychology'
            ],
            Engineering_courses: [
                'Civil',
                'Mechanical',
                'Electrical and Electronics',   //Not Available
                'Materials'                     //Not Available
            ],
            years: [
                'Year 1',
                'Year 2',
                'Year 3',
                'Year 4',
            ],
            semester: [
                'Semester 1',
                'Semester 2',
            ],

            Computing_subjects: [

            ],
            BS_subjects: [

            ],


            selectedDegree: '',
            courses: [],
            isFacultySelected: false,
            isCourseSelected: false,
            isYearSelected: false,
            isSemesterSelected: false
        }

    }

    handleClick(e) {
        e.preventDefault();
        let inner = e.target.innerHTML;
        this.setState({selectedDegree: inner}, (() => {
            alert("selected degree: " + this.state.selectedDegree)
            switch (inner) {
                case 'Computing': alert('ado Computing paraya');
                                  this.setState({
                                      courses: this.state.Computing_courses,
                                      isFacultySelected: true
                                  });
                    break;

                case 'BS': alert('ado BS p**nnaya');
                    this.setState({
                        courses: this.state.BS_courses,
                        isFacultySelected: true
                    });
                    break;

                case 'Law': alert('ado Law lokuda');
                    this.setState({
                        courses: this.state.Law_courses,
                        isFacultySelected: true
                    });
                    break;

                case 'Engineering': alert('ado Engineering rool krla $#4343');
                    this.setState({
                        courses: this.state.Engineering_courses,
                        isFacultySelected: true
                    });
                    break;

                default: alert("uba meh loke ekek newei");

            }
        }));
    };

    handleCourseClick(e) {
        e.preventDefault();
        let course = e.target.innerHTML;

        if (course !== null) {
            this.setState({isCourseSelected: true})
        }
    };

    handleYearClick(e) {
        e.preventDefault();
        let year = e.target.innerHTML;

        if (year !== null) {
            this.setState({isYearSelected: true})
        }
    };

    handleSemesterClick(e) {
        e.preventDefault();
        let semester = e.target.innerHTML;

        if (semester !== null) {
            this.setState({isSemesterSelected: true});

            switch (this.state.selectedDegree) {
                case 'Computing': alert('computing bitches');
                                  break;

                case 'BS': alert('BS bitches');
                            break;

                case 'Law': alert('law bitches');
                            break;

                case 'Engineering': alert('engineering bitches');
                                    break;
            }       }
    }

    render() {
        return(
            <div>
                <div className="card" style={{width: '100%'}}>

                    <div className='card-header bg-light'>
                        <h4> Courses </h4>
                    </div>

                    <div className='card'>
                        <div className='card-body'>
                         <div className="card-columns"></div>

                            {!this.state.isFacultySelected && this.state.degrees.map(degree =>
                                    <div className='form-group'>
                                        <a className='modal-header' href="#" onClick={this.handleClick}>{degree}</a>
                                    </div>

                            )}

                            {(this.state.isFacultySelected && !this.state.isCourseSelected ) && this.state.courses.map(course =>
                                <div className='form-group'>
                                    <a className='modal-header' href="#" onClick={this.handleCourseClick}>{course}</a>
                                </div>
                            )}

                            {(this.state.isCourseSelected && !this.state.isYearSelected) && this.state.years.map(year =>
                                <div className='form-group'>
                                    <a className='modal-header' href="#" onClick={this.handleYearClick}>{year}</a>
                                </div>
                            )}

                            {this.state.isYearSelected && this.state.semester.map( semester =>
                                <div className='form-group'>
                                    <a className='modal-header' href='#' onClick={this.handleSemesterClick}>{semester}</a>
                                </div>
                            )}


                        </div>
                    </div>

                </div>


            </div>
        );
    }

}

// module.exports = displayCourses;