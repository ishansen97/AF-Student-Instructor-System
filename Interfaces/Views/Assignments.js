import React, {Component} from 'react';
import NavBar from "../NavBar";

import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';


registerPlugin(FilePondPluginImagePreview);

class Assignments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            courseName: "",
            name: " ",
            dueDate: "",
            file:"",
            fileToSubmit: ""
        };
    }
//handle On Submit
    handleOnSubmit(e) {
        e.preventDefault();
        console.log(document.getElementById('courseName'));
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');
        formData.append('courses', this.state.courseName);
        formData.append('name', this.state.name);
        formData.append('file', fileField.files[0]);
        formData.append('dueDate', this.state.dueDate);
        formData.append('fileToSubmit', this.state.fileToSubmit);
        fetch('http://localhost:3000/api/instructor/assignments/add-assignments', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', JSON.stringify(response)));
        alert("New Record Added")
        this.props.history.push(`/instructorCorner`);

    };

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:3000/api/instructor/assignments/add-assignments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "courses": this.state.course,
                "name": this.state.name,
                "dueDate": this.state.dueDate,
                "fileToSubmit" :this.state.fileToSubmit
            })
        })
            .then(ress => {
                return ress.json();
            })
            .then(json => {
                console.log('good' + json);
            })
            .catch(err => {
                console.log('error: ' + err);
            })
        // console.log(notice);
    }


    componentDidMount() {
        fetch('http://localhost:3000/api/instructor/courses/get-courses/')
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({courses: json}, (() => {
                    console.log('courses: ' + this.state.courses)
                }))
            })
            .catch(err => {
                console.log('error: ' + err);
            })
    }
    setCourse(e){
        console.log(e.target.value)
    }


    render() {
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <h1>Assignments Upload</h1>
                    <hr/>
                    <hr/>
                    <form onSubmit={value => this.handleOnSubmit(value)}>
                        <table className="table table-sm table-dark">
                            <tr>
                                <th scope="col">Course</th>
                                <th><select className="form-control form-control-lg" id="courseName" name='courseName' onChange={e => this.onChange(e)}>
                                    {this.state.courses.map(course =>
                                        <option key={course.id} value={course._id}>{course.courseName}</option>
                                    )}
                                </select>
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">Assignment Name</th>
                                <th scope="col"><input type="text" className="form-control" name="name"  onChange={e => this.onChange(e)}
                                                       placeholder="Enter Assignment Name"/>
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">File</th>
                                <th><input type="file" className='form-control' name="file" id="file" onChange={e => this.onChange(e)}/></th>
                            </tr>
                            <tr>
                                <th scope="col">Due Date</th>
                                <th scope="col"><input type="date"  className="form-control" name="dueDate" onChange={e => this.onChange(e)}
                                                       placeholder="Enter Due Date"/></th>
                            </tr>
                            <tr>
                                <th scope="col">File To Submit</th>
                                <th scope="col"><input type="text"  className="form-control" name="fileToSubmit" onChange={e => this.onChange(e)}
                                                       placeholder="File Type"/></th>
                            </tr>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">
                                    <button style={{align: "right"}} type="submit" className="btn btn-light">Submit
                                    </button>
                                </th>
                            </tr>
                        </table>
                    </form>
                </div>

            </div>
        );
    }
}

export default Assignments;