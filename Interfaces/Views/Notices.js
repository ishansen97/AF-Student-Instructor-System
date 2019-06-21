import React, {Component} from 'react';
import NavBar from "../NavBar";

import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);

class Notices extends Component{
    render() {
        return(
            <div>
                <NavBar/>
                <div className="container">
                    <h1>Notice upload</h1>
                    <hr/>
                    {/*details file */}
                    <hr/>

                    <table class="table table-sm table-dark">
                        <tr>
                            <th scope="col">Course</th>
                            <th> <select className="form-control form-control-lg">
                                <option>Select course</option>
                            </select></th>
                        </tr>
                        <tr>
                            <th scope="col">Topic</th>
                            <th scope="col"><input type="topic" className="form-control" id="topic" placeholder="Enter Topic"/>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">Description </th>
                            <th scope="col"><textarea  type="description" className="form-control" id="description" placeholder="Enter description"/></th>
                        </tr>
                        <tr>
                            <th scope="col">Date </th>
                            <th scope="col"><input type="date" className="form-control" id="date" placeholder="Enter date"/></th>
                        </tr>
                        <tr>
                            <th scope="col">  </th>
                            <th scope="col">
                                <button style={{align:"right"}} type="button" className="btn btn-light">Submit</button> </th>
                        </tr>
                    </table>
                </div>

            </div>
        );
    }
}
export default Notices;

