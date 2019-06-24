import React, {Component} from "react";
import {Link} from "react-router-dom";


class Specializations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            specializationsArr:[]
        }
    }

    componentDidMount() {
        Object.values(this.state.props.location.moduleProps).map(faculty =>
            fetch('api/resources/student/get_spec_by_id/'+ faculty._id).then(data=>{
              return data.json();
            }).then(json =>{
                this.setState({specializationsArr:json})
            }).catch( err=>{
                console.log(err)
            })
        )
    }

    render() {
        return (
            <div className="container-fluid">
                <h1 className="card-header bg-dark text-white">Specializations</h1>
                {this.state.specializationsArr.map(specs =>
                    <div className="">
                        <Link style={{textDecoration:"none"}} to={{pathname: "/all_courses", moduleProps: {specs}}}>
                            {/*<li><i className="fas fa-book-open"*/}
                                   {/*style={{size: "9x"}}/> &nbsp;{specs.name}</li>*/}
                            <button type="button" className="btn btn-secondary btn-lg btn-block">
                                {specs.name}
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        );
    }
}

export default Specializations;
