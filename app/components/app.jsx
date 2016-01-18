'use strict';

import React from 'react'
import { render } from 'react-dom'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Menu/>
        <div className="content-container">{this.props.children}</div>
      </div>
    )
  }
}

module.exports = App;