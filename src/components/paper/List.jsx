import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from "react-redux";

import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from "@material-ui/core/styles";

import { getPapers, editPaper, deletePaper } from '../../actions/Paper';

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


class PaperList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKey: -1,
    }
  }

  componentWillMount = () => {
    this.props.dispatch(getPapers());
  }

  handleDelete = paperId => {
    this.props.dispatch(deletePaper(paperId))
  }

  handleClickOpen = i => {
    this.setState({ openKey: i });
  }

  handleClose = () => {
    this.setState({ openKey: -1 });
  }

  handleEdit = (e, paperId) => {
    e.preventDefault();
    const data = {
      id: paperId,
      text: e.target.text.value,
      url: e.target.url.value,
    }
    this.props.dispatch(editPaper(data));
    this.setState({ openKey: -1 });
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
                        <IconButton edge="end" aria-label="edit" onClick={() => this.handleClickOpen(i)} className={classes.iconButton}>
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => this.handleDelete(paper.id)} className={classes.iconButton}>
                          <DeleteIcon style={{ color: '#ee675d' }} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {paperListLength !== i + 1 &&
                      <Divider component="li" className={classes.divider} />
                    }

                    <Dialog open={this.state.openKey === i} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                      <form onSubmit={(e) => this.handleEdit(e, paper.id)}>
                        <DialogContent>
                          <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="text"
                            label="Text"
                            name="text"
                            defaultValue={paper.text}
                            fullWidth
                          />
                          <TextField
                            required
                            margin="dense"
                            id="url"
                            label="URL"
                            name="url"
                            defaultValue={paper.url}
                            fullWidth
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                          <Button type="submit" color="primary">
                            Save
                        </Button>
                        </DialogActions>
                      </form>
                    </Dialog>
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
  ))(PaperList)
