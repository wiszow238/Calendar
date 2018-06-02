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

export default class Home extends Component {
    state = {
        warningDialogOpen: false,
        appointmentDialogOpen: false,
        appointments: new Map(),
        appointmentAction: "",
        appointmentDate: "",
        appointmentTime: "",
        appointmentDescription: "",
        errorMessage: ""
    };

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
        let currentDate = new Date();
        if (currentDate > new Date(newAppointmentDate)) {
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

    renderMonth = () => {
        const monthLabels = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let date = new Date();

        return (<div className="month-header">
            {monthLabels[date.getMonth()] + " " + date.getFullYear()}
        </div>)
    };

    getStartOfWeek = (d) => {
        let date = new Date(d);
        let day = date.getDay();
        let diff = date.getDate() - day + (day === 0 ? -6 : 0);
        return new Date(date.setDate(diff));
    };

    renderDays = () => {
        let currentDate = new Date();
        let startOfWeek = this.getStartOfWeek(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

        let weeks = [];
        for (let weekNumber = 0; weekNumber < 5; weekNumber++) {
            weeks.push(<Week key={weekNumber}
                             date={startOfWeek.toDateString()}
                             openDialog={this.handleClickOpen}
                             appointments={this.state.appointments}
                             editDialog={this.handleEditClick}/>);
            startOfWeek.setDate(startOfWeek.getDate() + 7);
        }

        return weeks;
    };

    render() {
        return (
            <div>
                <Paper className="root">
                    <Table className="table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan="7">{this.renderMonth()}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>SUN</TableCell>
                                <TableCell>MON</TableCell>
                                <TableCell>TUE</TableCell>
                                <TableCell>WED</TableCell>
                                <TableCell>THU</TableCell>
                                <TableCell>FRI</TableCell>
                                <TableCell>SAT</TableCell>
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