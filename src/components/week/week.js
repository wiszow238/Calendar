import React, {Component} from 'react';

export default class Week extends Component {
    constructor(props) {
        super(props);
    }

    renderDayNumbers = () => {
        let date = new Date(this.props.date);
        let renderedDays = [];

        for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
            renderedDays.push(<td>{date.getDate()}</td>);
            date.setDate(date.getDate() + 1);
        }

        return renderedDays;
    };

    render() {
        return (
            <tr>
                {this.renderDayNumbers()}
            </tr>
        );
    }
}