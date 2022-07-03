import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { compose } from 'redux'
import { withRouter } from "react-router";

import {
  Grid,
  Link
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';

import DeleteDialog from './DeleteDialog';
import AddPaperDialog from './AddPaperDialog';

import * as PaperAction from '../../actions/Paper';

const styles = theme => ({
  titleContainer: {
    display: 'flex',
    color: '#fafafa'
  },
  dataGrid: {
    backgroundColor: '#fafafa',
    width: '100%',
    borderRadius: 4
  },
  rightIcon: {
    position: 'relative',
    top: 5
  },
  text: {
    marginTop: 7,
    marginBottom: 0
  }
})

class PaperIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.dispatch(PaperAction.getPapers());
  }

  columns = () => {
    const { classes, ...others } = this.props;
    return [
      { field: 'id', headerName: 'ID', width: 90, hide: true },
      {
        field: 'name',
        headerName: '部屋名',
        width: 200,
        renderCell: (params) => {
          return (
            <Link href={`/rooms/${params.id}`}>{params.value}</Link>
          )
        }
      },
      {
        field: 'members',
        headerName: 'メンバー',
        sortable: false,
        width: 300,
      },
      {
        field: 'createdAt',
        headerName: '登録日時',
        width: 150,
        editable: true,
      },
      {
        field: 'btns',
        headerName: '操作',
        sortable: false,
        editable: false,
        width: 80,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <div style={{display: 'inline-flex'}}>
              <DeleteDialog {...others} rowId={ params.id } handleDelete={PaperAction.deletePaper} />
            </div>
          )
        }
      }
    ]
  }

  rows = () => {
    return this.props.paper.paperList.map(paper => {
      return {
        id: paper.id,
        name: paper.name,
        members: paper.members.map(u => u.name).join(),
        createdAt: new Date(Date.parse(paper.created_at)).toLocaleString()
      }
    })
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.paper.paperList)

    return (
      <Grid item s={12} md={10}>
        <SiimpleBox className="siimple-box siimple--bg-dark" >
          <div className={classes.titleContainer}>
            <p className={classes.text}>部屋一覧</p>
            <AddPaperDialog className={classes.rightIcon} />
          </div>
          <div className="siimple-rule"></div>
          <div className={classes.dataGrid}>
            <DataGrid
              rows={this.rows()}
              columns={this.columns()}
              autoPageSize
              autoHeight
              rowHeight={30}
            />
          </div>
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
    }
  )
))(withRouter(PaperIndex))
