import React, {Component} from 'react';
import NavBar from "../NavBar";

import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);

class Results extends Component {


    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            courseName: "",
            description: "",
            file: ""

        };;
    }


    //handle On Submit
    handleOnSubmit(e) {
        e.preventDefault();
        console.log(document.getElementById('courseName'));
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');
        formData.append('courses', this.state.courseName);
        formData.append('description', this.state.description);
        formData.append('file', fileField.files[0]);
        fetch('http://localhost:3000/api/instructor/results/add-results', {
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

        fetch('http://localhost:3000/api/instructor/results/add-results', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "courses": this.state.course,
                "description": this.state.description,
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

    render() {
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <h1>Results Upload</h1>
                    <hr/>
                    <hr/>
                    <form onSubmit={value => this.handleOnSubmit(value)}>
                    <table class="table table-sm table-dark">
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
                            <th scope="col">Details</th>
                            <th scope="col"><textarea className="form-control" name="description"
                                                   onChange={e => this.onChange(e)}
                                                   placeholder="Enter details"/>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">File</th>
                            <th><input type="file" className='form-control' name="file" id="file" required/></th>
                        </tr>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">
                                <button style={{align: "right"}} type="submit" className="btn btn-light">Submit</button>
                            </th>
                        </tr>
                    </table>
                    </form>
                </div>

            </div>
        );
    }
}

export default Results;