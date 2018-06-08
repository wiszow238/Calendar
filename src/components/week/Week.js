import React, {Component} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    addButton: {
        width: "34px",
        height: "30px"
    },
    addIcon: {
        fontSize: "18px"
    },
    cell: {
        border: "1px solid rgba(224, 224, 224, 1)",
        padding: "unset",
        textAlign: "left",
        verticalAlign: "top",
        position: "relative",
        width: "14.39%",
        height: "50px"
    },
    differentMonthCell: {
        backgroundColor: "#f5f5f5",
    }
};

export class Week extends Component {
    constructor(props) {
        super(props);
    }

    renderButton = (renderDate) => {
        const {classes} = this.props;

        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        if (renderDate < currentDate) {
            return;
        }

        return (
            <div className="add-button">
                <Button mini variant="fab"
                        color="primary"
                        aria-label="add"
                        onClick={this.props.openDialog.bind(this, renderDate.toString())}
                        classes={{root: classes.addButton}}>
                    <AddIcon classes={{root: classes.addIcon}}/>
                </Button>
            </div>
        )
    };

    renderAppointmentLabel = (renderDate) => {
        let isoDate = (new Date(renderDate)).toISOString().split('T')[0];
        if (!this.props.appointments.has(isoDate)) {
            return;
        }

        return (
            <div>
                <Button mini color="secondary"
                        size="small"
                        onClick={this.props.editDialog.bind(this, isoDate)}>
                    Appointment
                </Button>
            </div>
        )
    };

    renderDayNumbers = () => {
        const {classes} = this.props;
        let date = new Date(this.props.date);
        let renderedDays = [];

        for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
            let cellStyle = classes.cell;
            renderedDays.push(
                <TableCell key={dayNumber} numeric
                           classes={{root: cellStyle}}>
                    <div className="day-number">
                        {date.getDate()}
                    </div>
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

export default withStyles(styles)(Week);