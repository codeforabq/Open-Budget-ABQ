'use strict'

import React from 'react'
import { render } from 'react-dom'
import d3 from 'd3'

import utils from '../utils/misc'

import Chart from './chart'
import DataSeries from './dataSeries'


module.exports = function(color, radius) {
  class PieChart extends React.Component {

    constructor() {
      super();
      this.radius = radius;
      this.color = color;
    }

    render() {
      var data = this.props.data,
          departmentName = data.key,
          departmentArr = departmentName.split(/\s{1}/),
          departmentNamePart1 = departmentArr[0],
          departmentNamePart2 = departmentArr.splice(1).join(' ');
      return (
        <Chart width={this.props.width} height={this.props.height} departmentName={departmentName}>
          <DataSeries data={data} color={this.color} radius={this.radius} width={this.props.width} height={this.props.height} />
          <text x={this.radius} y={this.props.height+15} className="text-middle">{departmentNamePart1}</text>
          <text x={this.radius} y={this.props.height+30} className="text-middle">{departmentNamePart2}</text>
          <text x={this.radius} y={this.props.height-25} className="text-middle on-chart">{(data.values.percentage*100).toPrecision(3)+'%'}</text>
          <text x={this.radius} y={this.props.height-10} className="text-middle on-chart">{(data.values.total/1000000.0).toPrecision(3) +'M'}</text>
        </Chart>
      );
    }
  }

  PieChart.defaultProps = {
    width: radius * 2,
    height: radius * 2
  }

  return PieChart;

};
