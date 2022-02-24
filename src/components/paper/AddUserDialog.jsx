import React from 'react';
import { compose } from 'redux'
import { connect } from "react-redux";

import {
  AddCircleOutlineOutlined as AddIcon
} from '@material-ui/icons';

import {
  withStyles,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core'

import * as PaperAction from '../../actions/Paper';

const styles = theme => ({
  container: {
  },
})

class AddUserDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      inputUserId: 0
    }
  }

  handleAddUser = () => {
    const data = {
      id: this.state.inputUserId,
    }
    this.props.dispatch(PaperAction.addUser(data.id))
    this.setState({
      open: false,
      inputUserId: 0
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChangeEmail = (e) => {
    this.setState({
      inputUserId: e.target.value
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <IconButton color="primary" edge="end" aria-label="edit" onClick={() => this.handleClickOpen()}>
          <AddIcon />
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="uid"
              label="ユーザーID"
              name="uid"
              defaultValue={this.state.inputUserId}
              onChange={this.handleChangeEmail}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              キャンセル
          </Button>
            <Button type="submit" color="primary" onClick={() => this.handleAddUser()}>
              追加
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(state => (
  {
    user: state.user,
    paper: state.paper,
  }
)
))(AddUserDialog)
