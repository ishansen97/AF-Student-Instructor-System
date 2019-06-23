import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Dialog from '../images/Dialog.png';
import Sampath from '../images/Sampath.png';
import Emblem from '../images/Emblem.png';
import Instructor from '../images/download.png';
import NavBar from "../App";
import SideNav from '../nav-components/SideNav';
import {BrowserRouter as Router} from "react-router-dom";

export default class MainAdmin extends Component{
    constructor(props) {
        super(props);

        this.state = {
            count: ''
        }

    }

    componentDidMount() {
        fetch('/api/resources/instructor/get-instructors')
            .then(res => {
                return res.json();
            })
            .then(json => {
                this.setState({count: json.length})
            })
            .catch(err => {
                console.log('error: ' + err);
            })
    }

    render() {
        return (
            <div>

                <div className='container'>
                    <div className='row'>
                        <h1 className='modal-header'>Admin Dashboard</h1>
                    </div>
                    <div className='row'>
                        <div className='col-4'>
                            <div className='card'>
                                <div className='card-header text-truncate'>
                                    <h2 className='modal-header'>Instructors</h2>
                                    <img src={Instructor} alt=""/>
                                </div>

                                <div className='card-body'>
                                    <table className='table table-borderless'>
                                        <tbody>
                                            <tr>
                                                <td>No. of Instructors</td>
                                                <td>{this.state.count}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/*<div className='col-4'>*/}
                            {/*<div className='card'>*/}
                                {/*<div className='card-header text-truncate'>*/}
                                    {/*<h2 className='modal-header'>Students</h2>*/}
                                    {/*<img src={Sampath} alt=""/>*/}
                                {/*</div>*/}
                                {/*<div className='card-body'>*/}
                                    {/*<table className='table table-borderless'>*/}
                                        {/*<tbody>*/}
                                        {/*<tr>*/}
                                            {/*<td>No. of Students</td>*/}
                                            {/*<td>10</td>*/}
                                        {/*</tr>*/}
                                        {/*</tbody>*/}
                                    {/*</table>*/}
                                {/*</div>*/}

                            {/*</div>*/}
                        {/*</div>*/}

                        {/*<div className='col-4'>*/}
                            {/*<div className='card'>*/}
                                {/*<div className='card-header text-truncate'>*/}
                                    {/*<h2 className='modal-header'>Courses</h2>*/}
                                    {/*<img src={Emblem} alt=""/>*/}
                                {/*</div>*/}
                                {/*<div className='card-body'>*/}
                                    {/*<table className='table table-borderless'>*/}
                                        {/*<tbody>*/}
                                        {/*<tr>*/}
                                            {/*<td>No. of Courses</td>*/}
                                            {/*<td>10</td>*/}
                                        {/*</tr>*/}
                                        {/*</tbody>*/}
                                    {/*</table>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                    <hr/>
                    {/*<div className='row'>*/}
                        {/*<div className='col-5'>*/}
                            {/*<div className='card'>*/}
                                {/*<div className='card-header text-truncate'>*/}
                                    {/*<h1 className='modal-header'>Upcoming Events</h1>*/}
                                {/*</div>*/}
                                {/*<div className='card-body'  id='event'>*/}
                                    {/*<div className='card form-group text-truncate'>*/}
                                        {/*<h5>Event 1</h5>*/}
                                        {/*<p>This is a good event</p>*/}
                                        {/*<div className='text-right'>*/}
                                            {/*<button type='button' className='btn btn-primary'>Update</button>*/}
                                            {/*<button type='button' className='btn btn-danger'>Delete</button>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className='card form-group text-truncate'>*/}
                                        {/*<h5>Event 2</h5>*/}
                                        {/*<p>This is a good event</p>*/}
                                        {/*<div className='text-right'>*/}
                                            {/*<button type='button' className='btn btn-primary'>Update</button>*/}
                                            {/*<button type='button' className='btn btn-danger'>Delete</button>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className='card form-group text-truncate'>*/}
                                        {/*<h5>Event 3</h5>*/}
                                        {/*<p>This is a good event</p>*/}
                                        {/*<div className='text-right'>*/}
                                            {/*<button type='button' className='btn btn-primary'>Update</button>*/}
                                            {/*<button type='button' className='btn btn-danger'>Delete</button>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<button type='button' className='btn btn-success'>Add Event</button>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}

                        {/*<div className='col-5'>*/}
                            {/*<div className='card'>*/}
                                {/*<div className='card-header text-truncate'>*/}
                                    {/*<h1 className='modal-header'>Notice Board</h1>*/}
                                {/*</div>*/}
                                {/*<div className='card-body'  id='notice'>*/}
                                    {/*<div className='card form-group'>*/}
                                        {/*<h5>Notice 1</h5>*/}
                                        {/*<p>This is a good notice</p>*/}
                                        {/*<div className='text-right'>*/}
                                            {/*<button type='button' className='btn btn-primary'>Update</button>*/}
                                            {/*<button type='button' className='btn btn-danger'>Delete</button>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className='card form-group'>*/}
                                        {/*<h5>Notice 2</h5>*/}
                                        {/*<p>This is a good notice</p>*/}
                                        {/*<div className='text-right'>*/}
                                            {/*<button type='button' className='btn btn-primary'>Update</button>*/}
                                            {/*<button type='button' className='btn btn-danger'>Delete</button>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className='card form-group'>*/}
                                        {/*<h5>Notice 3</h5>*/}
                                        {/*<p>This is a good notice</p>*/}
                                        {/*<div className='text-right'>*/}
                                            {/*<button type='button' className='btn btn-primary'>Update</button>*/}
                                            {/*<button type='button' className='btn btn-danger'>Delete</button>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<button type='button' className='btn btn-success'>Add Notice</button>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}

                    {/*</div>*/}
                </div>
            </div>
        );
    }


}