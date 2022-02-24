import React from 'react';
import { compose } from 'redux'
import { connect } from "react-redux";

import {
  Add as AddIcon
} from '@material-ui/icons';

import {
  withStyles,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'

import * as PaperAction from '../../actions/Paper';

const styles = theme => ({
  container: {
    marginLeft: 'auto',
  },
  inputLabel: {
    fontSize: 11,
    marginTop: 10,
    marginBottom: 3
  },
  formControlLabel: {
    height: 30
  },
  addBtn: {
    color: '#fafafa',
    padding: 0,
    position: 'relative',
    top: 4,
    right: 10
  },
})

class AddPaperDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      inputName: '',
    }
  }

  handleSave = e => {
    e.preventDefault();

    const data = {
      name: this.state.inputName,
    }
    this.props.dispatch(PaperAction.createPaper(data))
    this.setState({
      open: false,
      inputName: '',
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChangeName = (e) => {
    this.setState({
      inputName: e.target.value
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <IconButton className={classes.addBtn} edge="end" aria-label="edit" onClick={() => this.handleClickOpen()}>
          <AddIcon />
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <form className="siimple-form" onSubmit={this.handleSave}>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                label="部屋名"
                name="name"
                placeholder='2022/02/01-04 北海道旅行'
                onChange={this.handleChangeName}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>
                キャンセル
            </Button>
              <Button type="submit" color="primary">
                保存
            </Button>
            </DialogActions>
          </form>
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
))(AddPaperDialog)
