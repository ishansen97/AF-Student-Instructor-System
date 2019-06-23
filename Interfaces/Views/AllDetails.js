import React, {Component} from 'react';
import NavBar from "../NavBar";

class AllDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            props:props,
            courses: [],
            notices: [],
            materials: [],
            assignments: [],
            exams: [],
            results: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/instructor/notices/get-notices/' + this.props.match.params.course)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log('notices: ' + json);
                this.setState({notices: json}, (() => {
                    console.log('state: ' + this.state.notices)
                }))
            })
            .catch(err => {
                console.log('error: ' + err + this.props.match.params.course);
            });

        fetch('http://localhost:3000/api/instructor/materials/get-material/' + this.props.match.params.course)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log('materials: ' + json);
                this.setState({materials: json}, (() => {
                    console.log('materials: ' + this.state.materials)
                }))
            })
            .catch(err => {
                console.log('error: ' + err);
            });

        fetch('http://localhost:3000/api/instructor/assignments/get-assignments/' + this.props.match.params.course)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({assignments: json}, (() => {
                    console.log('assignments: ' + this.state.assignments)
                }))
            })
            .catch(err => {
                console.log('error: ' + err);
            });

        fetch('http://localhost:3000/api/instructor/exams/get-exams/' + this.props.match.params.course)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({exams: json}, (() => {
                    console.log('exams: ' + this.state.exams)
                }))
            })
            .catch(err => {
                console.log('error: ' + err);
            });

        fetch('http://localhost:3000/api/instructor/results/get-results/' + this.props.match.params.course)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({results: json}, (() => {
                    console.log('results: ' + this.state.results)
                }))
            })
            .catch(err => {
                console.log('error: ' + err);
            });

    }

    onSubmitAssignmentSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
        fetch('http://localhost:3000/api/instructor/assignments/update-assignment/' + e.target.value, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                    "dueDate": document.getElementById('courseName').value,
                }
            )
        }).then(response => {
            return response.json();

        }).then(json => {
            alert('update success  ' + json)
        }).catch(err => {
            alert('update success  ' + json)
        });
    }
        onSubmitExamSubmit(e){
            e.preventDefault();
            console.log(document.getElementById('examName').value + " Huththo");
            fetch('http://localhost:3000/api/instructor/exams/update-exam/' + e.target.value, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                        "dueDate": document.getElementById('examName').value,
                    }
                )
            }).then(response => {
                return response.json();

            }).then(json => {
                alert('update success  ' + json)
            }).catch(err => {
                alert('update success  ')
            })
        }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };


    render() {
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <div className="card text-center">
                        <h1 className="card-header">{this.props.location.courseName}</h1>
                        <hr/>
                        <div className="card-body">
                            <h3 className="card-title">Notices</h3>
                            <table className='table table-striped'>
                                <thead>
                                <tr>
                                    <th>Topic</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.notices.map(notice =>
                                    <tr>
                                        <td>{notice.topic}</td>
                                        <td>{notice.description}</td>
                                        <td>{notice.date}</td>
                                        <th>
                                        </th>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        <div className="card-body">
                            <h3 className="card-title">Materials</h3>
                            <table className='table table-striped'>
                                <thead>
                                <tr>
                                    <th>Lecture Name</th>
                                    <th>week</th>
                                    <th>file</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.materials.map(material =>
                                    <tr>
                                        <td>{material.lectureName}</td>
                                        <td>{material.week}</td>
                                        <td>{material.file}</td>
                                        <th>

                                        </th>
                                    </tr>
                                )}
                                </tbody>
                            </table>

                            <div className="card-body">
                                <h3 className="card-title">Assignment Details</h3>
                                <table className='table table-striped'>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>File</th>
                                        <th>Due Date</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.assignments.map(assignments =>
                                        <tr>
                                            <td>{assignments.name}</td>
                                            <td>{assignments.file}</td>
                                            <td id={assignments._id}>{assignments.dueDate}</td>
                                            <th>
                                                <input type="date" id="courseName"/>
                                                <button type="button" className="btn btn-dark" value={assignments._id} onClick={e => this.onSubmitAssignmentSubmit(e)}>Update</button>
                                            </th>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-body">
                                <h3 className="card-title">Exam Details</h3>
                                <table className='table table-striped'>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Due Date</th>
                                        <th>File</th>

                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.exams.map(exams =>
                                        <tr>
                                            <td>{exams.name}</td>
                                            <td>{exams.dueDate}</td>
                                            <td>{exams.file}</td>

                                            <th>
                                                <input type="date" id="examName"/>
                                                <button type="button" className="btn btn-dark" value={exams._id} onClick={e => this.onSubmitExamSubmit(e)}>Update</button>
                                            </th>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Results</h3>
                                <table className='table table-striped'>
                                    <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>File</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.results.map(results =>
                                        <tr>
                                            <td>{results.description}</td>
                                            <td>{results.file}</td>
                                            <th>
                                            </th>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div></div>
      );
    }
}

                export default AllDetails;
