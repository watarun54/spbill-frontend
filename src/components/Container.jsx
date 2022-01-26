import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { withStyles } from "@material-ui/core/styles";

import { compose } from 'redux'
import { connect } from "react-redux";

import { logout } from "../actions/User";
import { resetDataPapers } from "../actions/Paper";

import PaperIndex from './paper/Index';
import SginIn from './SignIn';
import SignUp from './SignUp';
import UserEdit from './user/Edit';
import Auth from "./Auth.jsx";
import ScrollToTop from "./ScrollToTop.jsx";


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    '& input': {
      fontSize: 16,
      transform: 'scale(0.8)',
    },
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#3f51b5',
  }
});

const unauthedMenus = [
  {text: 'Sign in', path: '/login'},
  {text: 'Sign up', path: '/signup'},
];

const authMenus = [
  {text: 'Home', path: '/'},
  {text: 'Trash', path: '/trash'},
  {text: 'Setting', path: '/setting'},
  {text: 'Logout', path: '/loguot'},
];

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      menus: this.props.user.token ? authMenus : unauthedMenus,
    }
  }

  componentWillReceiveProps = nextState => {
    this.setState({menus: nextState.user.token ? authMenus : unauthedMenus})
  }

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  onLogout = e => {
    e.preventDefault();
    this.props.dispatch(resetDataPapers());
    this.props.dispatch(logout());
    window.location.href = '/login'
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <BrowserRouter>
        <ScrollToTop/>

        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap className={classes.title}>
              Skill Manager
            </Typography>
            {this.props.user.name.length > 0 &&
              <Typography>{this.props.user.name} さん</Typography>
            }
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {this.state.menus.map((hash, index) => {
              if (hash.path == '/loguot') {
                return (
                  <Link key={index} to='/' onClick={this.onLogout.bind(this)} className={classes.link}>
                  <ListItem button key={index} onClick={this.handleDrawerClose}>
                    <ListItemIcon><LockIcon /></ListItemIcon>
                    <ListItemText primary={hash.text} />
                  </ListItem>
                  </Link>
                )
              }
              return (
                <Link key={index} to={hash.path} className={classes.link}>
                <ListItem button key={index} onClick={this.handleDrawerClose}>
                  <ListItemIcon>
                    {hash.path == '/' && <HomeIcon /> }
                    {hash.path == '/setting' && <SettingsIcon /> }
                    {hash.path == '/trash' && <DeleteSweepIcon /> }
                    {hash.path == '/login' && <LockOpenIcon /> }
                    {hash.path == '/signup' && <PersonAddIcon /> }
                  </ListItemIcon>
                  <ListItemText primary={hash.text} />
                </ListItem>
                </Link>
              )
            })}
          </List>
        </Drawer>
        <div
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open,
          })}
        >
        <div className={classes.drawerHeader} />
          <Switch>
            <Route path='/login'><SginIn /></Route>
            <Route path='/signup'><SignUp /></Route>
            <Auth>
              <Switch>
                <Route exact path='/'><PaperIndex {...this.props} is_deleted={false} /></Route>
                <Route path='/trash'><PaperIndex {...this.props} is_deleted={true} /></Route>
                <Route path='/setting'><UserEdit /></Route>
              </Switch>
            </Auth>
          </Switch>
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(state => (
    {
      user: state.user,
    }
  )
))(Container)
