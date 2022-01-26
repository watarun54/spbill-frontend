import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from "react-redux";
import { createPaper } from '../../actions/Paper';


class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAdd = e => {
    e.preventDefault();
    this.props.dispatch(createPaper({url: e.target.url.value}))
    e.target.url.value = '';
  }

  render() {
    return (
      <form className="siimple-form" onSubmit={this.handleAdd}>
        <div className="siimple-form-field">
          <StyledTextField required id="filled-basic" name="url" label="URL" variant="filled"/>
          {this.props.paper.isFetching &&
            <StyledCircularProgress />
          }
          {!this.props.paper.isFetching &&
            <StyledButton type="submit" variant="contained">Send</StyledButton>
          }
        </div>
      </form>
    );
  }
}

const StyledTextField = styled(TextField)`
  border-radius: 5px;
  background-color: #dde5ee;
  margin-right: 6px;
`;

const StyledButton = styled(Button)`
  height: 54px;
  color: #e0e0e0;
  background-color: #3f51b5;

  &:hover {
    opacity: 0.5;
    color: black;
  }
`;

const StyledCircularProgress = styled(CircularProgress)`
  margin-left: 10px;
  margin-top: 7px;
`;

export default connect(state => (
  {
    user: state.user,
    paper: state.paper,
  }
))(Form)
