import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  Grid,
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

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
  title: {
    color: '#fafafa',
    fontSize: 24,
    marginTop: 6,
    marginBottom: 6
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

class PaperAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSetDefaltValue: false,
      inputName: ''
    }
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

  handleSave = (e) => {
    e.preventDefault();

    const data = {
      name: this.state.inputName
    }
    this.props.dispatch(PaperAction.createPaper(data))
  }

  render() {
    const { classes } = this.props

    return (
      <Grid item s={12} md={10} className={classes.container}>
        <SiimpleBox className="siimple-box siimple--bg-dark" >
          <Typography variant="h1" noWrap className={classes.title}>
            部屋を作成して、割り勘をはじめる。
          </Typography>
          <div className="siimple-rule"></div>
          <form className={classes.form} onSubmit={this.handleSave}>
            <TextField
              autoFocus
              required
              id="name"
              label="部屋名"
              placeholder='例）伊豆旅行 2022/10/10~13'
              name="name"
              value={this.state.inputName}
              onChange={this.handleChangeName}
              fullWidth
              className={classes.field}
            />
            <Button type="submit" variant="outlined" color="primary" fullWidth>
              作成
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
))(withRouter(PaperAdd))
