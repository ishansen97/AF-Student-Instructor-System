import React, {Component} from "react";
import {COURSE_SELECTED_TO_ENROLL} from "./all_courses";

class EnrollToCourse extends Component{
    constructor(props) {
        super(props);
        this.state = {
            courseID:sessionStorage.getItem(COURSE_SELECTED_TO_ENROLL),
        }
    }

    render() {
        return(
            <div>
                <h1>hi</h1>
            </div>
        )
    }
}
export default EnrollToCourse;