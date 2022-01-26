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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";

import { compose } from 'redux'
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { getUser, updateUser, deleteUser } from "../../actions/User";


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


class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: null,
      userName: '',
      lineId: '',
    };
  }

  componentDidMount = () => {
    this.props.dispatch(getUser());
  }

  componentWillReceiveProps = nextState => {
    if (!nextState.user.token) {
      this.props.history.push("/login");
    } else if (nextState.user.errMsg.length > 0) {
      this.setState({ "message": nextState.user.errMsg });
    }
    this.setState({
      userName: nextState.user.name,
      lineId: nextState.user.lineId
    });
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  onEdit = e => {
    e.preventDefault();

    let name = e.target.name.value;
    let lineId = e.target.line_id.value;

    if (name === this.props.user.name && lineId === this.props.user.lineId) {
      this.setState({ "message": "変更内容を入力してください" });
    } else {
      this.setState({ "message": null });
      this.props.dispatch(updateUser(name, lineId));
      this.setState({ "message": `正常に変更されました` });
    }
  }

  onDelete = () => {
    this.props.dispatch(deleteUser());
  }

  onChangeUserName = e => {
    this.setState({userName: e.target.value});
  }

  onChangeLineId = e => {
    this.setState({lineId: e.target.value});
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
            Setting
          </Typography>
          <form className={classes.form} onSubmit={this.onEdit}>
            <Box component="span" display="block" className={classes.errMsg}>{this.state.message}</Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value = {this.state.userName}
                  onChange={this.onChangeUserName}
                />
                <TextField
                  autoComplete="line_id"
                  name="line_id"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="line_id"
                  label="Line ID"
                  value = {this.state.lineId}
                  onChange={this.onChangeLineId}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={this.handleClickOpen}
                >
                  Delete
                </Button>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">本当にアカウントを削除しますか？</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      アカウントを削除すると、アカウントに紐付く情報は完全に削除され、復元できなくなります。
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Disagree
                    </Button>
                    <Button onClick={this.onDelete} color="secondary">
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
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

Edit.contextTypes = {
  router: PropTypes.object
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(state => (
    { user: state.user }
  )
))(withRouter(Edit))
