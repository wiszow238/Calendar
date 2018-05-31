import React, {Component} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

export default class Week extends Component {
    constructor(props) {
        super(props);
    }

    renderButton = (renderDate) => {
        let currentDate = new Date();
        if (renderDate < currentDate) {
            return;
        }

        return (
            <Button mini variant="fab" color="primary" aria-label="add" onClick={this.props.openDialog}>
                <AddIcon/>
            </Button>
        )
    };

    renderDayNumbers = () => {
        let date = new Date(this.props.date);
        let renderedDays = [];

        for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
            renderedDays.push(
                <TableCell key={dayNumber} numeric>
                    {date.getDate()}
                    {this.renderButton(date)}
                </TableCell>
            );
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