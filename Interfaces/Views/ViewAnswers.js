/*
import React, {Component} from 'react';
import NavBar from "../NavBar";

class ViewAnswers extends Component {

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
                            uploadedFile: "http://localhost:3000/" + ass.uploadFile.split("\\", 2)[1],
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



    render() {
        return(
            <div>
                <NavBar/>

            </div>
        );
    }
}


export default ViewAnswers;*/
