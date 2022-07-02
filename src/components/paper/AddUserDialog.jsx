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
      inputMemberName: ''
    }
  }

  handleAddUser = () => {
    this.props.dispatch(PaperAction.addMember(this.state.inputMemberName))
    this.setState({
      open: false,
      inputMemberName: ''
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChangeMemberName = (e) => {
    this.setState({
      inputMemberName: e.target.value
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
              id="member_name"
              label="名前"
              name="member_name"
              placeholder='太郎'
              defaultValue={this.state.inputMemberName}
              onChange={this.handleChangeMemberName}
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
