'use strict'

import React from 'react'
import { render } from 'react-dom'
import d3 from 'd3'

import utils from '../utils/misc'

import Chart from './chart'
import DataSeries from './dataSeries'


class DepartmentDetails extends React.Component {

  render() {
    var data = this.props.data,
        colors = this.props.colors,
        barHeight = this.props.barHeight,
        radius = this.props.radius,
        chartType = 'barChart';
    return (
      <Chart singleView={true} chartType={chartType} data={data} barHeight={barHeight} departmentName={data.key} >
        <DataSeries singleView={true} chartType={chartType} data={data} colors={colors} radius={radius} barHeight={barHeight} />
      </Chart>
    );
  }
}

module.exports = DepartmentDetails;