'use strict'

import React from 'react'
import { render } from 'react-dom'
import d3 from 'd3'


class Bar extends React.Component {
  constructor() {
    super();
    this.state = {
      hovered: false
    }
  }

  setFilter(filter) {
    this.setState({hovered: filter})
  }

  isHovered() {
    return 'bar ' + (this.state.hovered ? 'bar-hovered' : '');
  }

  render() {
    var barHeight = this.props.barHeight,
        index = this.props.index,
        total = this.props.total,
        data = this.props.data,
        amount = data.amount,
        barStyle = {
          fill: this.props.colors(amount),
        },
        transform = 'translate(0, ' + (index*barHeight) + ')',
        name = data.showDescription == true ? data.description : data.name;

    return (
      <g transform={transform} className={this.isHovered()}
         onMouseEnter={this.setFilter.bind(this, true)} 
         onMouseLeave={this.setFilter.bind(this, false)}
      >
        <rect width={amount*81/total} height={barHeight-1} style={barStyle}></rect>
      </g>
    );
  }
};

module.exports = Bar;

