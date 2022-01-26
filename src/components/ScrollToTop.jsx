import React from 'react'

export default class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0)
  }

  render() {
    return null
  }
}
