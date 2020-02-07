import React from 'react';
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { setErrorMessage } from '../../redux/actions'

function ErrorDialog({errorMessage, setErrorMessage}) {

  const handleClose = () => {
    setErrorMessage(null);
  };

  return (
      <div>
        <Dialog
          open={Boolean(errorMessage)}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">There was an error</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

const mapStateToProps = state => {
    return {
        errorMessage: state.errorMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setErrorMessage: errorMessage => dispatch(setErrorMessage(errorMessage))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (ErrorDialog)