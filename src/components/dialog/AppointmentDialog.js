import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles/index";

const styles = {
    button: {
        width: "100%"
    }
};


export class AppointmentDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        let dialogTitle = "New Appointment";
        let dateDisabled = false;
        let deleteButton = "";
        if (this.props.appointmentAction === "edit") {
            dialogTitle = "Edit Appointment";
            dateDisabled = true;
            deleteButton = (
                <Button id="delete" onClick={this.props.handleDelete} color="primary">
                    Delete
                </Button>
            );
        }

        return (
            <Dialog open={this.props.appointmentDialogOpen}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <TextField id="date"
                                   label="Appointment Date"
                                   disabled={dateDisabled}
                                   type="date"
                                   value={this.props.appointmentDate}
                                   classes={{root: classes.button}}
                                   onChange={this.props.handleChange.bind(this, "appointmentDate")}/>
                    </div>
                    <div>
                        <TextField id="time"
                                   label="Appointment Time"
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   type="time"
                                   value={this.props.appointmentTime}
                                   classes={{root: classes.button}}
                                   onChange={this.props.handleChange.bind(this, "appointmentTime")}/>
                    </div>
                    <div>
                        <TextField id="description"
                                   label="Description"
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   multiline
                                   rowsMax="4"
                                   value={this.props.appointmentDescription}
                                   classes={{root: classes.button}}
                                   onChange={this.props.handleChange.bind(this, "appointmentDescription")}/>
                    </div>
                    <div>
                        {this.props.errorMessage}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleSave} color="primary">
                        Save
                    </Button>
                    {deleteButton}
                    <Button onClick={this.props.handleCancel} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(AppointmentDialog);