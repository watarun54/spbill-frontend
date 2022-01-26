import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from "react-redux";

import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import { withStyles } from "@material-ui/core/styles";

import { getDeletedPapers, recoverPaper, deletePaperCompletely } from '../../actions/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  list: {
    backgroundColor: '#fefefe',
    borderRadius: '5px',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  link: {
    textDecoration: 'none',
    color: '#3f51b5',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  listItem: {
    paddingRight: 65,
  },
  listItemAvatar: {
    minWidth: 33,
  },
  iconButton: {
    padding: 8,
  },
  divider: {
    marginRight: 75,
    marginLeft: 16,
  },
});


class PaperDeletedList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.props.dispatch(getDeletedPapers());
  }

  handleReturn = paperId => {
    this.props.dispatch(recoverPaper(paperId));
  }

  handleDelete = paperId => {
    this.props.dispatch(deletePaperCompletely(paperId));
  }

  render() {
    const { classes } = this.props;
    const paperListLength = this.props.paper.paperList.length;
    return (
      <Grid item s={12} md={9}>
        {paperListLength > 0 &&
          <div className={classes.list}>
            <List dense={true}>
              {this.props.paper.paperList.slice(this.props.offset, this.props.offset + this.props.parPage).map((paper, i) => {
                return (
                  <div key={i}>
                    <ListItem className={classes.listItem}>
                      <ListItemText>
                        <Link href={paper.url} rel="noopener" target="_blank" rel="noopener">
                          {paper.text}
                        </Link>
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="return" onClick={() => this.handleReturn(paper.id)} className={classes.iconButton}>
                          <AssignmentReturnIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => this.handleDelete(paper.id)} className={classes.iconButton}>
                          <DeleteIcon style={{ color: '#ee675d' }} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {paperListLength !== i + 1 &&
                      <Divider component="li" className={classes.divider} />
                    }
                  </div>
                );
              })}
            </List>
          </div>
        }
      </Grid>
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
  ))(PaperDeletedList)
