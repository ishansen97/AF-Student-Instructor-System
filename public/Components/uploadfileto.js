import React, {Component} from "react";
import {FilePond} from "react-filepond";

class UploadTest extends Component{
    render() {
        return(
            <div>
                <FilePond
                    server={{
                        // url: UPLOAD_SERVER_URL,
                        // process: {
                        //     url: '/files/upload',
                        //     withCredentials: true,
                        //     headers: authHeader,
                        //     timeout: 7000,
                        //     onload: this.handleUploadLoad,
                        //     onerror: this.handleUploadError
                        // },
                        load: {
                            method: 'GET',
                            url: 'http://localhost:4000/2019-06-23T06-51-27.122ZWhite%20Minimalist%20Photo%20College%20Resume.pdf',
                            // withCredentials: true,
                            // headers: authHeader,
                            // timeout: 7000,
                        }
                    }}
                />
            </div>
        )
    }
}

export default UploadTest;