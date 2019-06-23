import React, {Component} from "react";
import FileUploader from "./FileUploader";


class CourseModule extends Component {

    constructor(props) {
        super(props);
        this.state = {props: props}
    }

    render() {
        return (
            <div className="container-fluid courseModule">
                <div className="row">
                    <div className="col-sm card">
                        <h3 className="badge-danger">{Object.values(this.state.props.location.moduleProps.courses.moduleName.toString())}</h3>
                        <h4 className="text-dark">{Object.values(this.state.props.location.moduleProps.courses.moduleDescription.toString())}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        {this.state.props.location.moduleProps.courses.haveNotice === true ?
                            Object.values(this.state.props.location.moduleProps.courses.moduleNotices).map((notices, nk) =>
                                <div className="card">
                                    <h4 className="card-header alert-warning">{notices.noticeHeader}</h4>
                                    <h6 className="card-text">{notices.notice.toString()}</h6>
                                    <h6>
                                        <small className="badge-dark">{notices.noticeDate}</small>
                                    </h6>
                                </div>
                            ) : <h3 className="badge-info">No Notices.</h3>}
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <div className="customSlides">
                            {this.state.props.location.moduleProps.courses.moduleAssignmentAval === true ?
                                Object.values(this.state.props.location.moduleProps.courses.moduleAssignments).map((moduleAss, mak) =>
                                    <div className="card">
                                        <h4 className="badge-dark card-header">{moduleAss.mAssignmentName}</h4>
                                        <h5 className="card-text text-info">{moduleAss.mAssignmentDescription}</h5>
                                        {moduleAss.mAssignmentInstructions.map((moduleAssIns, maik) =>
                                            <h6 className="card-text"><a href={moduleAssIns.document} target="_blank"><i
                                                className="fas fa-pencil-alt"/>&nbsp;{moduleAssIns.documentDescription}
                                            </a></h6>
                                        )}

                                        <FileUploader dueDate={moduleAss.mAssignmentDueDate} studentID="IT17098960" assignmentID="5d0c7f1bc3fece40a84281a8"/>

                                    </div>
                                ) : console.log("no module assignments")
                            }
                            {Object.values(this.state.props.location.moduleProps.courses.moduleContent).map((each, i) =>

                                <div key={i} className="card">
                                    <p className="card-header" key={i}>{each.week}</p>
                                    {each.weekContent.map((weekC, k) =>
                                        <a className="card-text" href={weekC.slide} target="_blank"
                                           rel="noopener noreferrer" key={k}><i className="fas fa-sticky-note"
                                                                                key={i}/>&nbsp;{weekC.slideName}</a>
                                    )}
                                    {each.assignmentAval === true ? each.assignment.map((assMap, ak) =>
                                            <div className="card">
                                                <h3 className="card-header bg-dark text-white"
                                                    key={ak}>{assMap.assignmentName}</h3>
                                                <a className="card-text" href={assMap.assignmentDescription} key={ak}
                                                   style={{color: "red"}}><i className="fas fa-file"
                                                                             key={ak}/>&nbsp;Instructions</a>
                                                <div className="col-sm-3">

                                                    < FileUploader dueDate={assMap.assignmentDueDate}/>

                                                </div>
                                            </div>
                                        )
                                        : console.log("no assignments")}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseModule;

