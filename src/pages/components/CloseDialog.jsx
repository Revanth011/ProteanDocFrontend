import "./styles/CloseDialog.css";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function CloseDialog({ open, handleClose, deleteFunc }) {
    return (
        <div className="">
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to delete?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={deleteFunc}>Delete</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CloseDialog;
