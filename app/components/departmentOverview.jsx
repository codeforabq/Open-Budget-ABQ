'use strict'

import React from 'react'
import { render } from 'react-dom'
import d3 from 'd3'

import utils from '../utils/misc'

import Chart from './chart'
import DataSeries from './dataSeries'


class DepartmentOverview extends React.Component {

  render() {
    var data = this.props.data,
        radius = this.props.radius,
        width = radius * 2,
        height = width,
        colors = this.props.colors,
        departmentNameArr = data.key.split(/\s{1}/),
        departmentName1 = departmentNameArr[0],
        departmentName2 = departmentNameArr.splice(1).join(' '),
        percentage = (data.values.percentage*100).toPrecision(3) +'%',
        budget = (data.values.total/1000000.0).toPrecision(3) +'M',
        chartType = 'pieChart';
    return (
      <Chart width={width} height={height} data={data} departmentName={data.key} chartType={chartType}>
        <DataSeries data={data} colors={colors} radius={radius} width={width} height={height} chartType={chartType}/>
        <text x={this.props.radius} y={height+15} className="text-middle">{departmentName1}</text>
        <text x={this.props.radius} y={height+30} className="text-middle">{departmentName2}</text>
        <text x={this.props.radius} y={height-25} className="text-middle on-chart">{percentage}</text>
        <text x={this.props.radius} y={height-10} className="text-middle on-chart">{budget}</text>
      </Chart>
    );
  }
}

module.exports = DepartmentOverview;