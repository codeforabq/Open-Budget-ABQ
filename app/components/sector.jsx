'use strict'

import React from 'react'
import { render } from 'react-dom'
import d3 from 'd3'


class Sector extends React.Component {
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
    return 'arc ' + (this.state.hovered ? 'sector-hovered' : '');
  }

  render() {
    var arc = d3.svg.arc()
      .outerRadius(this.props.radius)
      .innerRadius(0);

    var arcStyle = {
      fill: this.props.colors(this.props.data.value),
    }

    return (
      <g className={this.isHovered()} style={arcStyle} 
      onMouseEnter={this.setFilter.bind(this, true)} 
      onMouseLeave={this.setFilter.bind(this, false)}>
        <path d={arc(this.props.data)}></path>
      </g>
    );
  }
};

module.exports = Sector;

