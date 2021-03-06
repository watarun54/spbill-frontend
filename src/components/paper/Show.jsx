import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  ArrowRight
} from '@material-ui/icons';
import {
  Grid,
  Link,
  Typography
} from '@material-ui/core';

import { DataGrid } from '@material-ui/data-grid';
import { withStyles } from "@material-ui/core/styles";

import * as PaperAction from '../../actions/Paper';
import * as BillAction from '../../actions/Bill';

import DeleteDialog from './DeleteDialog';
import EditBillDialog from './EditBillDialog';
import AddBillDialog from './AddBillDialog';
import NotFound from '../NotFound';

const styles = theme => ({
  whiteText: {
    color: '#fafafa'
  },
  dataGrid: {
    backgroundColor: '#fafafa',
    width: '100%',
    borderRadius: 4
  },
  titleContainer: {
    lineHeight: '40px',
    color: '#fafafa'
  },
  title: {
    color: '#fafafa',
    fontSize: 24,
    marginTop: 6,
    marginBottom: 6,
    lineHeight: '40px'
  },
  rightIcon: {
    position: 'relative',
    top: 5
  }
})

class PaperShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.dispatch(PaperAction.getPaper(this.props.match.params.id));
    this.props.dispatch(BillAction.getBillsByRoomId(this.props.match.params.id));
    this.props.dispatch(BillAction.getUserPaymentsByRoomId(this.props.match.params.id));
  }

  columns = () => {
    const { classes, ...others } = this.props;
    return [
      { field: 'id', headerName: 'ID', width: 90, hide: true },
      {
        field: 'name',
        headerName: '品目',
        width: 200,
      },
      {
        field: 'amount',
        headerName: '金額(円)',
        width: 130,
      },
      {
        field: 'payer',
        headerName: '支払った人',
        width: 140,
      },
      {
        field: 'payees',
        headerName: '支払ってもらった人',
        width: 200,
      },
      {
        field: 'createdAt',
        headerName: '登録日時',
        width: 130,
      },
      {
        field: 'updatedAt',
        headerName: '更新日時',
        width: 130,
      },
      {
        field: 'btns',
        headerName: '操作',
        sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <div style={{display: 'inline-flex'}}>
              <EditBillDialog {...others} rowId={ params.id } />
              <DeleteDialog {...others} rowId={ params.id } handleDelete={BillAction.deleteBill} />
            </div>
          )
        }
      }
    ]
  }

  rows = () => {
    return this.props.bill.billList.map(bill => {
      return {
        id: bill.id,
        name: bill.name,
        amount: bill.amount,
        payer: bill.payer.name,
        payees: bill.payees.map(payee => payee.name).join(),
        createdAt: new Date(Date.parse(bill.created_at)).toLocaleString(),
        updatedAt: new Date(Date.parse(bill.updated_at)).toLocaleString()
      }
    })
  }

  getUserPaymentTexts = () => {
    return this.props.bill.userPayments.map(up => {
      return `${up.from_member.name} は ${up.to_member.name} に ${up.amount}円 渡す`
    })
  }

  render() {
    const { classes } = this.props;
    const { paper, error } = this.props.paper

    if (error) {
      return (
        <NotFound />
      )
    } else {
      return (
        <Grid item s={12} md={10}>
          <SiimpleBox className="siimple-box siimple--bg-dark" >
            <div className={classes.titleContainer}>
              <Typography variant="h1" className={classes.title}>
                {paper?.name}
              </Typography>
              <Link href={`/rooms/${paper?.id}/edit`} color="inherit">
                <ArrowRight className={classes.rightIcon} />メンバーを追加
              </Link>
              <AddBillDialog />
            </div>
            <div className="siimple-rule"></div>
            <ul>
              {this.getUserPaymentTexts().map((text, i) => {
                return (
                  <li key={i} className={classes.whiteText}>
                    {text}
                  </li>
                )
              })}
            </ul>
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
))(withRouter(PaperShow))
