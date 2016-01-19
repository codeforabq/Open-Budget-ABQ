import React from 'react'
import { render } from 'react-dom'

var goals = {};

goals.init = function(data) {
  this.data = data;
}

class Goals extends React.Component {
  render() {
    return (
      <div>
      </div>
    )
  }
}

goals.Goals = Goals;

module.exports = goals;