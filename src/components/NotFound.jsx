
import React from 'react';
import PropTypes from 'prop-types';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";

import { compose } from 'redux'
import { withRouter } from 'react-router';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 15
  }
});

class SignIn extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h1" className={classes.title}>
            ページが見つかりません
          </Typography>
          <Link href="/" variant="body1">
            トップページに戻る
          </Link>
        </div>
      </Container>
    );
  }
}

SignIn.contextTypes = {
  router: PropTypes.object
};

export default compose(
    withStyles(styles, { withTheme: true }),
)(withRouter(SignIn))

