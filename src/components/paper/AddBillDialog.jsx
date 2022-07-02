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

import * as BillAction from '../../actions/Bill';

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

class AddBillDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      inputName: '',
      inputAmount: 0,
      inputPayerId: 0,
      inputPayeeIds: []
    }
  }

  handleSave = e => {
    e.preventDefault();
    const { paper } = this.props;

    const data = {
      name: this.state.inputName,
      amount: this.state.inputAmount,
      room_id: paper.paper.id,
      payer_id: this.state.inputPayerId,
      payee_ids: this.state.inputPayeeIds
    }
    this.props.dispatch(BillAction.createBill(data))
    this.setState({
      open: false,
      inputName: 'タクシー代',
      inputAmount: 1000,
      inputPayerId: 0,
      inputPayeeIds: []
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

  handleChangeAmount = (e) => {
    this.setState({
      inputAmount: Number(e.target.value)
    })
  }

  handleChangePayer = (e) => {
    const payerId = Number(e.target.value)
    this.setState({
      inputPayerId: payerId,
      inputPayeeIds: this.state.inputPayeeIds.filter(pid => pid !== payerId)
    })
  }

  handleChangePayee = (e) => {
    const checked = e.target.checked
    const payeeId = Number(e.target.value)
    let payeeIds = this.state.inputPayeeIds
    if (checked) {
      payeeIds.push(payeeId)
    } else {
      payeeIds = payeeIds.filter(pid => pid !== payeeId)
    }
    this.setState({
      inputPayeeIds: payeeIds
    })
  }

  payerSelectItems = () => {
    const { paper } = this.props;
    if (!paper.paper) return

    return paper.paper.members.map((payer, i) => {
      return <MenuItem key={i} value={payer.id}>{payer.name}</MenuItem>
    })
  }

  payeeCheckBoxes = () => {
    const { classes, paper } = this.props;
    if (!paper.paper) return

    return paper.paper.members
      .filter(u => u.id !== this.state.inputPayerId)
      .map((payee, i) => {
        const checked = this.state.inputPayeeIds.includes(payee.id)
        return (
          <FormControlLabel
            key={i}
            control={<Checkbox checked={checked} onChange={this.handleChangePayee} value={payee.id} color="primary" />}
            label={payee.name}
            className={classes.formControlLabel}
          />
        )
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
                label="品目"
                name="name"
                placeholder='タクシー代'
                onChange={this.handleChangeName}
                fullWidth
              />
              <TextField
                type="number"
                required
                margin="dense"
                id="name"
                label="金額"
                name="amount"
                placeholder='2000'
                onChange={this.handleChangeAmount}
                fullWidth
              />
              <InputLabel
                id="demo-simple-select-disabled-label"
                required
                className={classes.inputLabel}
              >
                支払った人
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                required
                value={this.state.inputPayerId}
                onChange={this.handleChangePayer}
                fullWidth
              >
                {this.payerSelectItems()}
              </Select>
              <InputLabel
                id="demo-simple-select-disabled-label"
                required
                className={classes.inputLabel}
              >
                支払ってもらった人
              </InputLabel>
              <FormGroup>
                {this.payeeCheckBoxes()}
              </FormGroup>
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
))(AddBillDialog)
