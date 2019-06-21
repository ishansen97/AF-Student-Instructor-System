import React , {Component} from 'react';
import NavBar from './NavBar'

class InstructorCorner extends Component{
    render() {
        return(
            <div>
                <NavBar/>
                <div className="container">
                    <h1>Instructor Corner</h1>
                    <hr/>
                </div>

            </div>
        );
    }
}

export default InstructorCorner;