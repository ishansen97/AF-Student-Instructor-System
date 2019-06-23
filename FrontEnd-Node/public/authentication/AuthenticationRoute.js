import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Authentication from './authentication';
import Login from '../components/Login';

export default class AuthenticationRoute extends Component {

    render() {
        if (Authentication.isLoggedIn()) {
            return <Route path={this.props.path} component={this.props.component} />
        }
        else {
            return <Route path='/' component={Login}/>
        }
    }
}