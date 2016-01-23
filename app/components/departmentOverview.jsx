'use strict'

import React from 'react'
import { render } from 'react-dom'
import d3 from 'd3'

import utils from '../utils/misc'

import Chart from './chart'
import DataSeries from './dataSeries'


class DepartmentOverview extends React.Component {

  render() {
    console.log(this.props.width);
    var data = this.props.data,
        width = this.props.radius * 2,
        height = width,
        departmentNameArr = data.key.split(/\s{1}/),
        departmentNamePart1 = departmentNameArr[0],
        departmentNamePart2 = departmentNameArr.splice(1).join(' ');
    return (
      <Chart width={this.props.width} height={this.props.height} departmentName={data.key}>
        <DataSeries data={data} color={this.props.color} radius={this.props.radius} width={width} height={height} />
        <text x={this.props.radius} y={height+15} className="text-middle">{departmentNamePart1}</text>
        <text x={this.props.radius} y={height+30} className="text-middle">{departmentNamePart2}</text>
        <text x={this.props.radius} y={height-25} className="text-middle on-chart">{(data.values.percentage*100).toPrecision(3)+'%'}</text>
        <text x={this.props.radius} y={height-10} className="text-middle on-chart">{(data.values.total/1000000.0).toPrecision(3) +'M'}</text>
      </Chart>
    );
  }
}

module.exports = DepartmentOverview;