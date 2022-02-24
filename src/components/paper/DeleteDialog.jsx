import React from 'react';
import { connect } from "react-redux";

import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  deleteRow = (rowId, e) => {
    this.props.dispatch(this.props.handleDelete(rowId))
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <IconButton edge="end" aria-label="delete" onClick={this.handleOpen}>
          <DeleteIcon style={{ color: '#ee675d' }} />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">本当に削除しますか？</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              キャンセル
            </Button>
            <Button onClick={(e) => this.deleteRow(this.props.rowId, e)} color="secondary">
              削除
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default connect(state => (
  {
    user: state.user,
    paper: state.paper,
  }
))(DeleteDialog)