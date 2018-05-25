import React, {Component} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default class Week extends Component {
    constructor(props) {
        super(props);
    }

    renderDayNumbers = () => {
        let date = new Date(this.props.date);
        let renderedDays = [];

        for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
            renderedDays.push(<TableCell key={dayNumber} numeric>{date.getDate()}</TableCell>);
            date.setDate(date.getDate() + 1);
        }

        return renderedDays;
    };

    render() {
        return (
            <TableRow>
                {this.renderDayNumbers()}
            </TableRow>
        );
    }
}