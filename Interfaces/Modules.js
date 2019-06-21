import React , {Component} from 'react';
import NavBar from './NavBar'

class Modules extends Component{

    constructor(props){
        super(props);
        this.state={props : props}
    }


    render() {
        return(
            <div>
                <NavBar/>
                <div className="container">
                    <h1>{this.props.location.propName}</h1>
                    <hr/>
                </div>

            </div>
        );
    }
}
export default Modules;