import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  IndeterminateCheckBoxOutlined as MinusIcon,
  ArrowRight
} from '@material-ui/icons';
import {
  Grid,
  FormGroup,
  InputLabel,
  Button,
  TextField,
  Link,
  IconButton
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

import AddUserDialog from './AddUserDialog';

import * as PaperAction from '../../actions/Paper';

const styles = theme => ({
  form: {
    backgroundColor: '#fafafa',
    borderRadius: 4,
    padding: 20
  },
  text: {
    margin: 0
  },
  titleContainer: {
    display: 'flex',
    color: '#fafafa'
  },
  inputLabel: {
    fontSize: 15,
    marginTop: 16,
    marginBottom: 12
  },
  listElement: {
    margin:8
  },
  field: {
    marginBottom: 12
  },
  flex: {
    display: 'flex',
  },
  btn: {
    padding: 7
  },
  rightIcon: {
    position: 'relative',
    top: 5
  }
})

class PaperEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSetDefaltValue: false,
      inputName: ''
    }
  }

  componentDidMount = () => {
    this.props.dispatch(PaperAction.getPaper(this.props.match.params.id))
  }

  componentDidUpdate = () => {
    const { paper } = this.props

    if (!this.state.isSetDefaltValue && paper.paper) {
      this.setState({
        inputName: paper.paper.name,
        isSetDefaltValue: true
      })
    }
  }

  handleChangeName = (e) => {
    this.setState({
      inputName: e.target.value
    })
  }

  handleClickRemoveUser = (userId) => {
    const paper = this.props.paper.paper
    paper.users = paper.users.filter(u => u.id !== userId)
    this.props.dispatch(PaperAction.setPaper(paper))
  }

  userList = () => {
    const { classes, paper } = this.props
    if (!paper.paper) return

    return paper.paper.users.map((user, i) => {
              return (
                <div key={i} className={classes.flex}>
                  <IconButton className={classes.btn} color="secondary" edge="end" aria-label="edit" onClick={() => this.handleClickRemoveUser(user.id)}>
                    <MinusIcon />
                  </IconButton>
                  <p className={classes.listElement}>{user.name}</p>
                </div>
              )
            })
  }

  handleSave = e => {
    e.preventDefault();
    const paper = this.props.paper.paper

    const data = {
      id: paper.id,
      name: this.state.inputName,
      user_ids: paper.users.map(u => u.id)
    }
    this.props.dispatch(PaperAction.editPaper(data))
  }

  render() {
    const { classes } = this.props
    const paper = this.props.paper.paper

    return (
      <Grid item s={12} md={10} className={classes.container}>
        <SiimpleBox className="siimple-box siimple--bg-dark" >
          <div className={classes.titleContainer}>
            {paper &&
              <Link href={`/rooms/${paper.id}`} color="inherit">
                <ArrowRight className={classes.rightIcon} />「{paper.name}」の立替一覧に戻る
              </Link>
            }
          </div>
          <div className="siimple-rule"></div>
          <form className={classes.form} onSubmit={this.handleSave}>
            <TextField
              autoFocus
              required
              id="name"
              label="部屋名"
              name="name"
              value={this.state.inputName}
              onChange={this.handleChangeName}
              fullWidth
              className={classes.field}
            />
            <FormGroup className={classes.field}>
              <div className={classes.flex}>
                <InputLabel
                  id="demo-simple-select-disabled-label"
                  required
                  className={classes.inputLabel}
                >
                  メンバー
                </InputLabel>
                <AddUserDialog />
              </div>
              {this.userList()}
            </FormGroup>
            <Button type="submit" variant="outlined" color="primary" fullWidth>
              保存
            </Button>
          </form>
        </SiimpleBox>
      </Grid>
    );
  }
}

const SiimpleBox = styled.div`
  margin-bottom: 0;
  width: 100%;
  padding: 13px;
`;

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(state => (
    {
      paper: state.paper,
      bill: state.bill,
    }
  )
))(withRouter(PaperEdit))
