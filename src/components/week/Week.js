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
            <div>
                <Button mini variant="fab"
                        color="primary"
                        aria-label="add"
                        onClick={this.props.openDialog.bind(this, renderDate.toString())}>
                    <AddIcon/>
                </Button>
            </div>
        )
    };

    renderAppointmentLabel = (renderDate) => {
        let isoDate = (new Date(renderDate)).toISOString().split('T')[0];
        if (!this.props.appointments.has(isoDate)) {
            return;
        }
        let appointment = this.props.appointments.get(isoDate);

        return (
            <div>
                <Button mini color="secondary"
                        size="small"
                        value={isoDate}>
                    Appointment
                </Button>
            </div>
        )
    };

    renderDayNumbers = () => {
        let date = new Date(this.props.date);
        let renderedDays = [];

        for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
            renderedDays.push(
                <TableCell key={dayNumber} numeric>
                    {date.getDate()}
                    {this.renderAppointmentLabel(date)}
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