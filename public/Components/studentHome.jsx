import React, {Component} from "react";
import CalendarComponent from './studentCalander';
import {Slide} from "react-slideshow-image";
import Img1 from '../images/slide_1.jpg';
import Img2 from '../images/slide_2.jpg';
import Img3 from '../images/slide_4.jpg';
import '../App.css';
import {STUDENT_SESSION} from "./studentLogin";

    const slideImages = [
        Img1,
        Img2,
        Img3
    ];

    const properties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: false,
        arrows: true
    };
    class Home extends Component {

        componentDidMount() {
            if(sessionStorage.getItem(STUDENT_SESSION) === null){
                alert('logged out');
                this.props.history.push("/")
            }else{
                // alert('your good');
            }
        }

        render() {

            return (
                <div>
                    <div className="container">
                    <Slide {...properties}>
                        <div className="each-slide">
                            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                                <span>Quality is not an act, but a habit.</span>
                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                                <span>The expert in everything was once a beginner.</span>
                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                                <span>Remember your dreams and fight for them.</span>
                            </div>
                        </div>
                    </Slide>

                        <div className="row">
                            <div className="col-sm" style={{background: '#e0e0e2', padding: '10px'}}>
                                <h2>Synopsis</h2><br></br>
                                <p>
                                    We are a leading non-state degree awarding institute approved by the University Grants
                                    Commission (UGC) under the Universities Act. We are also members of the Association of
                                    Commonwealth Universities (ACU), as well as the International Association of
                                    Universities (IAU), and the first Sri Lankan institute to be accredited by the
                                    Institution of Engineering & Technology, UK.
                                </p>
                                <p>
                                    We are proud to be listed as a leading and formidable awarding institute authorised and
                                    approved by the University Grants Commission (UGC) under the Universities Act, and the
                                    International Association of Universities (IAU). Furthermore, not only are we the first
                                    Sri Lankan institute to be accredited by the Institution of Engineering & Technology
                                    (IET.), UK, our IT degrees are also in turn accredited by the Engineering Council, UK.
                                </p>
                            </div>
                            <div className="col-sm-4" style={{background: '#e0e0e2'}}>
                                < CalendarComponent/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

export default Home;