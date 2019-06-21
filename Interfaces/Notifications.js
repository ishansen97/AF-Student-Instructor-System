import React , {Component} from 'react'
import NavBar from './NavBar'

class Notifications extends Component{
    render() {
        return(
            <div>
                <NavBar/>
                <div className="container">
                    <h1>Notifications</h1>
                    <hr/>
                </div>

            </div>

        );
    }

}
export default Notifications;