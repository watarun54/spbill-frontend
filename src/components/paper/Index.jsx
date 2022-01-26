import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';

import Form from './Form';
import PaperList from './List';
import PaperDeletedList from './DeletedList';
import PaperPagination from './Pagination';


class PaperIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid item s={12} md={10}>
        {!this.props.is_deleted &&
          <SiimpleBox className="siimple-box siimple--bg-dark" >
            <Form/>
            <div className="siimple-rule"></div>
            <PaperPagination {...this.props} />
            <PaperList offset={this.props.offset} parPage={this.props.parPage}/>
            <PaperPagination {...this.props} />
          </SiimpleBox>
        }
        {this.props.is_deleted &&
          <SiimpleBox className="siimple-box siimple--bg-dark" >
            <div className="siimple-rule"></div>
            <PaperPagination {...this.props} />
            <PaperDeletedList offset={this.props.offset} parPage={this.props.parPage}/>
            <PaperPagination {...this.props} />
          </SiimpleBox>
        }
      </Grid>
    );
  }
}

const SiimpleBox = styled.div`
  min-height: 550px;
  margin-bottom: 0;
  width: 100%;
`;

export default connect(state => (
  {
    paper: state.paper,
  }
))(PaperIndex)
