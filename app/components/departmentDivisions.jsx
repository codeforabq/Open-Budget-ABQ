'use strict'

import React from 'react'
import { render } from 'react-dom'
import d3 from 'd3'

import utils from '../utils/misc'

import Chart from './chart'
import DataSeries from './dataSeries'


class DepartmentDivisions extends React.Component {

  render() {
    var data = this.props.data,
        width = this.props.radius * 2,
        height = width;
    return (
      <Chart width={this.props.width} height={this.props.height} departmentName={data.key}>
        <DataSeries singleView={true} data={data} color={this.props.color} radius={this.props.radius} width={width} height={height} />
      </Chart>
    );
  }
}

module.exports = DepartmentDivisions;