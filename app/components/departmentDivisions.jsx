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
        colors = this.props.colors,
        radius = this.props.radius,
        width = radius * 2,
        height = width,
        chartType = 'pieChart';
    return (
      <Chart singleView={true} chartType={chartType} departmentName={data.key} >
        <DataSeries singleView={true} chartType={chartType} data={data} colors={colors} radius={radius} width={width} height={height} />
      </Chart>
    );
  }
}

module.exports = DepartmentDivisions;