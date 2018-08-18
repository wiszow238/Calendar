import React, {Component} from 'react';
import Week from "../week/Week";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import WarningDialog from "../dialog/WarningDialog";
import AppointmentDialog from "../dialog/AppointmentDialog";
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
    cell: {
        padding: "unset",
        textAlign: "unset",
        verticalAlign: "middle",
        fontSize: "1rem",
        fontWeight: "500"
    },
    dayNameRow: {
        height: "20px",
        textAlign: "center",
        verticalAlign: "middle"
    },
    nextMonthCell: {
        textAlign: "right"
    },
    changeMonthButton: {
        color: "#000000",
        opacity: "0.54"
    }
};

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warningDialogOpen: false,
            appointmentDialogOpen: false,
            appointments: new Map(),
            appointmentAction: "",
            appointmentDate: "",
            appointmentTime: "",
            appointmentDescription: "",
            errorMessage: "",
            displayMonth: new Date()
        };
    }

    handleClickOpen = (date) => {
        date = (new Date(date)).toISOString().split('T')[0];

        if (this.state.appointments.has(date)) {
            this.setState({
                warningDialogOpen: true,
                appointmentDialogOpen: false,
                appointmentAction: "save",
                appointmentDate: date
            });
        } else {
            this.setState({
                warningDialogOpen: false,
                appointmentDialogOpen: true,
                appointmentAction: "save",
                appointmentDate: date
            });
        }
    };

    handleEditClick = (date) => {
        let appointment = this.state.appointments.get(date);

        this.setState({
            warningDialogOpen: false,
            appointmentDialogOpen: true,
            appointmentAction: "edit",
            appointmentDate: date,
            appointmentTime: appointment.time,
            appointmentDescription: appointment.description
        });
    };

    handleSave = () => {
        if ((new Date(this.state.appointmentDate) == "Invalid Date") ||
            this.state.appointmentDate === "") {
            this.setState({errorMessage: "Invalid date entered"});
            return;
        }

        let newAppointmentTime = "23:59:59";
        if (this.state.appointmentTime !== "") {
            newAppointmentTime = this.state.appointmentTime + ":00";
        }
        let newAppointmentDate = this.state.appointmentDate + "T" + newAppointmentTime;
        if (this.state.displayMonth > new Date(newAppointmentDate)) {
            this.setState({errorMessage: "You can not create a new \n appointment that is in the past."});
            return;
        }

        this.state.appointments.set(this.state.appointmentDate, {
            time: this.state.appointmentTime,
            description: this.state.appointmentDescription
        });

        this.resetDialogState();
    };

    handleCancel = () => {
        this.resetDialogState();
    };

    handleDelete = () => {
        this.state.appointments.delete(this.state.appointmentDate);
        this.resetDialogState();
    };

    handleWarningYes = () => {
        this.setState({
            warningDialogOpen: false,
            appointmentDialogOpen: true,
            appointmentTime: "",
            appointmentDescription: ""
        })
    };

    resetDialogState = () => {
        this.setState({
            warningDialogOpen: false,
            appointmentDialogOpen: false,
            appointmentAction: "",
            appointmentDate: "",
            appointmentTime: "",
            appointmentDescription: "",
            errorMessage: ""
        });
    };

    handleChange = (name, event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleNextMonthClick = () => {
        let nextMonth = this.state.displayMonth.setMonth(this.state.displayMonth.getMonth() + 1);
        this.setState({
            displayMonth: new Date(nextMonth)
        });
    };

    handlePrevMonthClick = () => {
        let prevMonth = this.state.displayMonth.setMonth(this.state.displayMonth.getMonth() - 1);
        this.setState({
            displayMonth: new Date(prevMonth)
        });
    };

    renderMonth = () => {
        const monthLabels = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return (<div className="month-header">
            {monthLabels[this.state.displayMonth.getMonth()] + " " + this.state.displayMonth.getFullYear()}
        </div>)
    };

    getStartOfWeek = (d) => {
        let date = new Date(d);
        if (date.getDay() === 0) {
            return date;
        }

        let day = date.getDay();
        let diff = date.getDate() - day + (day === 0 ? -7 : 0);
        return new Date(date.setDate(diff));
    };

    renderDays = () => {
        let currentDate = this.state.displayMonth;
        let startOfWeek = this.getStartOfWeek(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

        let weeks = [];
        for (let weekNumber = 0; weekNumber < 5; weekNumber++) {
            weeks.push(<Week key={weekNumber}
                             date={startOfWeek.toDateString()}
                             selectedMonth={currentDate.getMonth()}
                             openDialog={this.handleClickOpen}
                             appointments={this.state.appointments}
                             editDialog={this.handleEditClick}/>);
            startOfWeek.setDate(startOfWeek.getDate() + 7);
        }

        return weeks;
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Paper className="table">
                    <Table className="table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Button mini size="small"
                                            id="btn1"
                                            classes={{text: classes.changeMonthButton}}
                                            onClick={this.handlePrevMonthClick}>
                                        Previous Month
                                    </Button>
                                </TableCell>
                                <TableCell colSpan="5">{this.renderMonth()}</TableCell>
                                <TableCell classes={{root: classes.nextMonthCell}}>
                                    <Button mini size="small"
                                            classes={{text: classes.changeMonthButton}}
                                            onClick={this.handleNextMonthClick}>
                                        Next Month
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow classes={{root: classes.dayNameRow}}>
                                <TableCell classes={{root: classes.cell}}>SUN</TableCell>
                                <TableCell classes={{root: classes.cell}}>MON</TableCell>
                                <TableCell classes={{root: classes.cell}}>TUE</TableCell>
                                <TableCell classes={{root: classes.cell}}>WED</TableCell>
                                <TableCell classes={{root: classes.cell}}>THU</TableCell>
                                <TableCell classes={{root: classes.cell}}>FRI</TableCell>
                                <TableCell classes={{root: classes.cell}}>SAT</TableCell>
                            </TableRow>
                            {this.renderDays()}
                        </TableBody>
                    </Table>
                </Paper>
                <WarningDialog warningDialogOpen={this.state.warningDialogOpen}
                               handleClose={this.handleClose}
                               handleWarningYes={this.handleWarningYes}
                               handleCancel={this.handleCancel}/>

                <AppointmentDialog appointmentDate={this.state.appointmentDate}
                                   appointmentTime={this.state.appointmentTime}
                                   appointmentDescription={this.state.appointmentDescription}
                                   appointmentDialogOpen={this.state.appointmentDialogOpen}
                                   appointmentAction={this.state.appointmentAction}
                                   errorMessage={this.state.errorMessage}
                                   handleClose={this.handleClose}
                                   handleDelete={this.handleDelete}
                                   handleChange={this.handleChange}
                                   handleCancel={this.handleCancel}
                                   handleSave={this.handleSave}/>
            </div>
        );
    }
}

export default withStyles(styles)(Home);