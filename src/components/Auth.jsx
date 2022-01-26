import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from "react-redux";

import { logout } from "../actions/User"
import { resetDataPapers } from "../actions/Paper"

class Auth extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.paper.tokenExpired === 1) {
      this.props.dispatch(resetDataPapers());
      this.props.dispatch(logout());
      this.props.history.push("/login");
    }
  }

  componentWillMount() {
    this.checkAuth();
  }

  componentWillUpdate() {
    this.checkAuth();
  }

  checkAuth() {
    if (!this.props.user.token) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

Auth.contextTypes = {
  router: PropTypes.object
};

const connectedAuth = connect(state => ({
  user: state.user,
  paper: state.paper
}))(Auth);

export default withRouter(connectedAuth);
