import React, {Component} from 'react';
import Calendar from 'react-calendar';


class CalendarComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: new Date()
        };

        this.onchange = this.onchange.bind(this);
    }



    onchange(date) {
        this.setState({date})
    };

    render() {
        return (
            <div>
                <h2>Calendar</h2>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                />
            </div>
        )
    }

}

export default CalendarComponent;