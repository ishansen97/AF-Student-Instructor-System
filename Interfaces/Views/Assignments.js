import React, {Component} from 'react';
import NavBar from "../NavBar";

import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);

class Assignments extends Component{
    render() {
        return(
            <div>
                <NavBar/>
                <div className="container">
                    <h1>Assignments Upload</h1>
                    <hr/>
                        {/*details file */}
                            <div className="custom-file mb-3">
                               <FilePond/>
                            </div>
                    <hr/>
                    <table class="table table-sm table-dark">
                        <tr>
                            <th scope="col">Assignment Name </th>
                            <th scope="col"><input type="aName" className="form-control" id="aName" placeholder="Enter Assignment Name"/>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">Due Date </th>
                            <th scope="col"><input type="dDate" className="form-control" id="dDate" placeholder="Enter Due Date"/></th>
                        </tr>
                        <tr>
                            <th scope="col">Time Remaining </th>
                            <th scope="col"></th>
                        </tr>
                        <tr>
                            <th scope="col">Uploaded date </th>
                            <th scope="col">--------------</th>
                        </tr>
                        <tr>
                            <th scope="col">File Submission  </th>
                            <th scope="col"> <FilePond/> </th>
                        </tr>
                    </table>
                </div>

            </div>
        );
    }
}
export default Assignments;