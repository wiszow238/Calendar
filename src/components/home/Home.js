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
        open: false,
        appointments: new Map(),
        newAppointmentDate: "",
        newAppointmentTime: "",
        newAppointmentDescription: ""
    };

    handleClickOpen = (date) => {
        date = (new Date(date)).toISOString().split('T')[0];
        this.setState({
            open: true,
            newAppointmentDate: date
        });
    };

    handleSave = () => {
        if ((new Date(this.state.newAppointmentDate) == "Invalid Date") ||
            this.state.newAppointmentDate === "" ||
            this.state.appointments.has(this.state.newAppointmentDate)) {
            //TODO::Adds exception handling
        }

        this.state.appointments.set(this.state.newAppointmentDate, {
            time: this.state.newAppointmentTime,
            description: this.state.newAppointmentDescription
        });

        this.setState({
            open: false,
        });
    };

    handleCancel = () => {
        this.setState({open: false});
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
                             appointments={this.state.appointments}/>);
            startOfWeek.setDate(startOfWeek.getDate() + 7);
        }

        return weeks;
    };

    renderAppointmentDialog = () => {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle>
                    New Appointment
                </DialogTitle>
                <DialogContent>
                    <div>
                        <TextField
                            id="appointmentDate"
                            label="Appointment Date"
                            type="date"
                            value={this.state.newAppointmentDate}
                            onChange={this.handleChange("newAppointmentDate")}
                        />
                    </div>
                    <div>
                        <TextField
                            id="appointmentTime"
                            label="Appointment Time"
                            type="time"
                            value={this.state.newAppointmentTime}
                            onChange={this.handleChange("newAppointmentTime")}
                        />
                    </div>
                    <div>
                        <TextField
                            id="description"
                            label="Description"
                            multiline
                            rowsMax="4"
                            value={this.state.newAppointmentDescription}
                            onChange={this.handleChange("newAppointmentDescription")}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSave} color="primary">
                        Save
                    </Button>
                    <Button onClick={this.handleCancel} color="primary">
                        Cancel
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
                {this.renderAppointmentDialog()}
            </div>
        );
    }
}