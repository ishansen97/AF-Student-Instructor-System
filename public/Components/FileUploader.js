import React, {Component} from "react";
import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);


class FileUploader extends Component {

    constructor(props) {
        super(props),
        this.state = {
            uploadID:"",
            uploadedFile:"",
            needUpload:"block",
            showUploaded:"none",
            editUpload:"none"
        }
    }
    componentDidMount() {
        fetch('api/resources/student/get_all_assignment').then( data => {
            return data.json();
        }).then( jsonData => {
            jsonData.map(ass => {
                if(ass.assignmentID === this.props.assignmentID && ass.studentID === this.props.studentID){
                    this.setState(
                        {
                            uploadedFile: "http://localhost:4000/" + ass.uploadFile.split("\\", 2)[1],
                            showUploaded:"block",
                            needUpload:"none",
                            editUpload:"none"
                        })
                }else {
                    this.setState(
                        {
                            uploadedFile: "",
                            showUploaded:"none",
                            needUpload:"block",
                            editUpload:"none"
                        })
                }
            })
        }).catch( err => {
            console.log(err)
        });
    }

    handlePondFile(error, file) {
        if (error) {
            console.log('Oh no');
            return;
        }
        console.log('File added', file.serverId);
        this.setState({uploadID: file.serverId});
        this.goBack();
        // this.fetchImages()
    }

    handleEditFile(error, file){
        if(error){
            console.log('Oh no');
            return;
        }
        console.log('File updated', file.serverId);
        this.goBack();
    }
    upload_assignment(e){
        e.preventDefault();
        fetch('api/resources/student/update_assignments_by_id/'+this.state.uploadID.replace(/^"(.+(?="$))"$/, '$1'),{
            method: 'PUT',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(
                {
                    "studentID": this.props.studentID,
                    "assignmentID": this.props.assignmentID
                }
            )
        }).then( data => {
            console.log(data.json())
        }).catch( er => {
            console.log(er)
        });
        console.log(this.state.uploadID)
    }
    editUpload(e){
            if(this.state.editUpload === "none"){
               this.setState({editUpload:"block", showUploaded:"none"})
            }else{
                this.setState({editUpload:"none", showUploaded:"none"})
            }
    }
    goBack(e){
        this.setState({editUpload:"none", showUploaded:"block"})
    }

    render() {
        return (
            <div>
                <div style={{display:this.state.needUpload}}>
                <p className="card-text"><i className="fas fa-arrow-down"/> &nbsp;Submit Below </p>
                <p>{this.props.studentID}</p>
                <FilePond
                    onprocessfile={this.handlePondFile.bind(this)}
                    name={"image"}
                    server="http://localhost:4000/api/resources/student/upload_assignment"
                />
                <h6>
                    {/*<small className="text-danger">Selected or Dropped Files will automatically uploaded.</small>*/}
                    <button onClick={e => this.upload_assignment(e)} className="btn btn-success">Upload</button>
                </h6>
                </div>
                <div style={{display:this.state.showUploaded}}>
                    <h5><small className="alert-success">assignment submitted for grading</small></h5>
                    <a href={this.state.uploadedFile}><i className="fas fa-file-download fa-3x"/>&nbsp;</a> <i onClick={e => this.editUpload(e)} className="fas fa-edit text-warning"/>
                </div>
                <br/>
                <div style={{display:this.state.editUpload}}>
                    <i className="fas fa-long-arrow-alt-left fa-3x" onClick={e => this.goBack(e)}> Go Back</i>
                    <br/>
                    <FilePond
                        onprocessfile={this.handleEditFile.bind(this)}
                        name={"image"}
                        server={"http://localhost:4000/api/resources/student/edit_assignment/"
                        + this.props.studentID
                            + "/" + this.props.assignmentID
                                }
                    />
                    {/*<h6>*/}
                        <small className="text-danger">Selected or Dropped Files will automatically uploaded.</small>
                        {/*<button onClick={e => this.edit_assignment(e)} className="btn btn-success">Upload</button>*/}
                    {/*</h6>*/}
                </div>
            </div>
        )
    }
}

export default FileUploader;