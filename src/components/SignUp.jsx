import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";

import { compose } from 'redux'
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { signup } from "../actions/User";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/watarun54">
        watarun54
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  errMsg: {
    color: '#f50057',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "message": null };
  }

  componentWillMount = () => {
    if (this.props.user.token) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps = nextState => {
    if (nextState.user.uid !== 0 ) {
      this.props.history.push("/login");
    } else if (nextState.user.errMsg.length > 0) {
      this.setState({ "message": nextState.user.errMsg });
    }
  }

  onSignup = e => {
    e.preventDefault();

    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (name && email && password) {
      this.setState({ "message": null });
      this.props.dispatch(signup(name, email, password));
    } else {
      this.setState({ "message": "Name,Email,パスワードを入力してください" });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={this.onSignup}>
            <Box component="span" display="block" className={classes.errMsg}>{this.state.message}</Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="" variant="body2" onClick={() => this.props.history.push("/login")}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

SignUp.contextTypes = {
  router: PropTypes.object
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(state => (
    { user: state.user }
  )
))(withRouter(SignUp))
