import React, {Component} from 'react';
import NavBar from "../NavBar";

class Notices extends Component {

    constructor(props) {
        super(props);
        this.state = {

            courses: [],
            course: "",
            topic: " ",
            description: "",
            date: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event){
        this.setState({[event.target.name] : event.target.value})
    }
    onSubmit(event){
        event.preventDefault();
        fetch('/api/instructor/notices/add-notice', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "courses" : this.state.course,
                "topic" : this.state.topic,
                "description" : this.state.description,
                "date" : this.state.date
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
                    <h1>Notice upload</h1>
                    <hr/>
                    {/*details file */}
                    <hr/>
                    <form onSubmit={e => this.onSubmit(e)}>
                        <table className="table table-sm table-dark">
                            <tbody>
                            <tr>
                                <th scope="col">Course</th>
                                <th><select className="form-control form-control-lg" name='course'>
                                    {this.state.courses.map(course =>
                                        <option key={course.id} onChange={e => this.onChange(e)}>{course.courseName}</option>
                                    )}
                                </select>
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">Topic</th>
                                <th scope="col"><input type="text" className="form-control" id="topic" name='topic'
                                                       onChange={e => this.onChange(e)}
                                                       placeholder="Enter Topic"/>
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">Description</th>
                                <th scope="col"><textarea className="form-control" id="description" name="description"
                                                          onChange={e => this.onChange(e)}
                                                          placeholder="Enter description"/></th>
                            </tr>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col"><input type="date" className="form-control" id="date" name="date"
                                                       onChange={e => this.onChange(e)}
                                                       placeholder="Enter date"/></th>
                            </tr>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">
                                    <button style={{align: "right"}} type="submit" className="btn btn-light">Submit
                                    </button>
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>

            </div>
        );
    }
}

export default Notices;

