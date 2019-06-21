import React, {Component} from 'react';
import pic01 from "./pic01.jpg";
import pic02 from "./pic02.jpg";
import pic03 from "./pic03.jpg";

import {Slide} from 'react-slideshow-image';

import NavBar from './NavBar'

const slideImages = [
    pic01,
    pic02,
    pic03
];

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
}

class Home extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div>
                    <Slide {...properties}>
                        <div className="each-slide">
                            <div style={{'backgroundImage': `url(${slideImages[0]})`, backgroundPositionY: "-700px"}}>
                                {/*<span>Slide 1</span>*/}
                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{'backgroundImage': `url(${slideImages[1]})`, backgroundPositionY: "-200px"}}>
                                {/*<span>Slide 2</span>*/}
                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                                {/*<span>Slide 3</span>*/}
                            </div>
                        </div>
                    </Slide>
                    <hr/>
                    <div className="container">
                        <h1>YOUR PATH TO GREATNESS STARTS HERE</h1>
                        <blockquote className="blockquote text-center">
                            <span>We are a leading non-state degree awarding institute approved by the University Grants Commission (UGC) under the Universities Act.
                                We are also members of the Association of Commonwealth Universities (ACU), as well as the International Association of Universities (IAU),
                                and the first Sri Lankan institute to be accredited by the Institution of Engineering & Technology, UK. </span>
                        </blockquote>
                        <blockquote className="blockquote text-center">
                            <span>We are proud to be listed as a leading and formidable awarding institute authorised and approved by the University
                                Grants Commission (UGC) under the Universities Act, and the International Association of Universities (IAU). Furthermore,
                                not only are we the first Sri Lankan institute to be accredited by the Institution of Engineering & Technology (IET.), UK,
                                our IT degrees are also in turn accredited by the Engineering Council, UK.</span>
                        </blockquote>
                    </div>

                </div>
            </div>
        );
    }
}

export default Home;