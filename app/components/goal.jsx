import React from 'react'
import { render } from 'react-dom'

var goal = {};

goal.init = function(data) {
  this.data = data;
}

class Goal extends React.Component {
  render() {
    return (
      <div>
      </div>
    )
  }
}

goal.Goal = Goal;

module.exports = goal;