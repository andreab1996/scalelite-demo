import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';

class FormDialog extends Component {
    render() {
        return (
            <div style={{ width: "300px" }}>
                <Dialog
                    open={this.props.open}
                    aria-labelledby="form-dialog-title"
                    maxWidth="sm"
                >
                    <DialogTitle id="form-dialog-title">Add new server</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Server name"
                            onChange={(e) => { this.props.onNameChange(e) }}
                            fullWidth
                        />
                        <div style={{ color: "red" }}>{this.props.duplicate === true ? "Server name must be unique." : ""}</div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.onSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

export default FormDialog;