import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class WarningDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog open={this.props.warningDialogOpen}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle>
                    Warning!
                </DialogTitle>
                <DialogContent>
                    An appointment exists for this date.
                    Are you sure you want to continue and override the existing appointment?
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleWarningYes} color="primary">
                        Yes
                    </Button>
                    <Button onClick={this.props.handleCancel} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}