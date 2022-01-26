import React, { Component } from 'react';

import Container from './Container';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      offset: 0,
      parPage: 50,
    };
    this.handleClickPagination = this.handleClickPagination.bind(this);
  }

  handleClickPagination = offset => {
    this.setState({ offset })
  }

  render() {
    return (
      <div>
        <Container
          offset={this.state.offset}
          parPage={this.state.parPage}
          handleClickPagination={this.handleClickPagination}
        />
      </div>
    );
  }
}
