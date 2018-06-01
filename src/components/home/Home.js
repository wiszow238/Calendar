import React, {Component} from 'react';
import Week from "../week/Week";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Home extends Component {
    state = {
        warningDialogOpen: false,
        appointmentDialogOpen: false,
        appointments: new Map(),
        appointmentAction: "",
        appointmentDate: "",
        appointmentTime: "",
        appointmentDescription: ""
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
            this.state.appointmentDate === "" ||
            this.state.appointments.has(this.state.appointmentDate)) {
            //TODO::Adds exception handling
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
            appointmentDescription: ""
        });
    };

    handleChange = name => event => {
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

    renderAppointmentDialog = () => {
        let dialogTitle = "New Appointment";
        let dateDisabled = false;
        let deleteButton = "";
        if (this.state.appointmentAction === "edit") {
            dialogTitle = "Edit Appointment";
            dateDisabled = true;
            deleteButton = (
                <Button onClick={this.handleDelete} color="primary">
                    Delete
                </Button>
            );
        }

        return (
            <Dialog open={this.state.appointmentDialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <TextField id="appointmentDate"
                                   label="Appointment Date"
                                   disabled={dateDisabled}
                                   type="date"
                                   value={this.state.appointmentDate}
                                   onChange={this.handleChange("appointmentDate")}/>
                    </div>
                    <div>
                        <TextField id="appointmentTime"
                                   label="Appointment Time"
                                   type="time"
                                   value={this.state.appointmentTime}
                                   onChange={this.handleChange("appointmentTime")}/>
                    </div>
                    <div>
                        <TextField id="description"
                                   label="Description"
                                   multiline
                                   rowsMax="4"
                                   value={this.state.appointmentDescription}
                                   onChange={this.handleChange("appointmentDescription")}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSave} color="primary">
                        Save
                    </Button>
                    {deleteButton}
                    <Button onClick={this.handleCancel} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    renderWarningDialog = () => {
        return (
            <Dialog open={this.state.warningDialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle>
                    Warning!
                </DialogTitle>
                <DialogContent>
                    An appointment exists for this date.
                    Are you sure you want to continue and override the existing appointment?
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleWarningYes} color="primary">
                        Yes
                    </Button>
                    <Button onClick={this.handleCancel} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        );
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
                {this.renderWarningDialog()}
                {this.renderAppointmentDialog()}
            </div>
        );
    }
}