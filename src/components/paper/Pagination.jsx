import React from 'react';
import styled from 'styled-components';
import Pagination from "material-ui-flat-pagination";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';


class PaperPagination extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid item s={12} md={9}>
        {this.props.paper.paperList.length > this.props.parPage &&
        <StyledPagination
          limit={this.props.parPage}
          offset={this.props.offset}
          total={this.props.paper.paperList.length}
          onClick={(e, offset) => this.props.handleClickPagination(offset)}
          reduced={true}
          size={'small'}
        />
        }
      </Grid>
    );
  }
}

const StyledPagination = styled(Pagination)`
  background-color: white;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
`;

export default connect(state => (
  {
    paper: state.paper,
  }
))(PaperPagination)
