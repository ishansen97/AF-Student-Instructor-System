import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import Authentication, {ADMINROLE, USERNAME} from '../authentication/authentication';

export default class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            user_type: '',
            username: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        // alert(this.state.username + ", " + this.state.password);

        Authentication.authenticateAdmin(this.state.username, this.state.password)
            .then(jsonObj => {
                // alert('success: ' + jsonObj);
                if (jsonObj.username === undefined) {
                    alert('username or password incorrect. please try again later');
                }
                else {
                    Authentication.setUsername(jsonObj.username);


                    switch (jsonObj.username) {
                        case 'AD001': Authentication.setAdminRole('Main');
                                        break;

                        case 'AD002': Authentication.setAdminRole('Computing');
                            break;

                        case 'AD003': Authentication.setAdminRole('Engineering');
                            break;

                        case 'AD004': Authentication.setAdminRole('Law');
                            break;

                        case 'AD005': Authentication.setAdminRole('Computing');
                            break;

                        case 'AD006': Authentication.setAdminRole('Computing');
                            break;

                        case 'AD007': Authentication.setAdminRole('Engineering');
                            break;

                        case 'AD008': Authentication.setAdminRole('Law');
                            break;

                        case 'AD009': Authentication.setAdminRole('Business');
                            break;

                        case 'AD010': Authentication.setAdminRole('Computing');
                            break;

                        case 'AD011': Authentication.setAdminRole('Engineering');
                            break;
                    }
                    this.props.history.push(`/main`);
                }

            })
            .catch(err => {
                alert('error: ' + err);
            })
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='card' style={{margin: 'auto', width: '60%'}}>
                        <div className='card-header bg-primary'>
                            <h1 className='modal-header'>Sign In</h1>
                        </div>
                        <div className='card-body'>
                            <form action="#" method='POST' onSubmit={e => this.handleSubmit(e)}>

                                <label htmlFor="username"><b>Username</b></label>
                                <input type="text" name='username' id='username' className='form-control' onChange={e => this.handleChange(e)} required/>
                                <label htmlFor="password"><b>Password</b></label>
                                <input type="password" name='password' id='password' className='form-control' onChange={e => this.handleChange(e)} required/>
                                <button type='submit' className='btn btn-success form-control' style={{marginTop: '20px'}}>Login</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}