'use strict'

import React from 'react'
import { render } from 'react-dom'
import d3 from 'd3'

import Sector from './sector'
import Bar from './bar'


class DataSeries extends React.Component {

  render() {
    var pie = d3.layout.pie(),
        classRef = this,
        dataForPie = null,
        total = this.props.data.values.total,
        barHeight = this.props.barHeight;

    // departments or department single view
    if(this.props.hasOwnProperty('singleView') && this.props.singleView) {
      dataForPie = this.props.data.values.divisions;
    } else {
      dataForPie = this.props.data.values.budgets;
    }

    var amounts = dataForPie.map(function(d) { return d.amount; }),
        svgTree = null,
        transform = 'translate(0, 0)';

    // create the chart svg tree according to charType
    if(this.props.chartType == 'pieChart') {
      transform = 'translate(' + this.props.radius + ', ' + this.props.radius + ')';
      svgTree = pie(amounts).map(function(d, i) {
        return (
          <Sector data={d} key={i} radius={classRef.props.radius} colors={classRef.props.colors} name={dataForPie[i].name}/>
        )
      });
    } else {
      svgTree = dataForPie.map(function(d, i) {
        return (
          <Bar data={d} key={i} index={i} barHeight={barHeight} total={total} colors={classRef.props.colors} name={dataForPie[i].name}/>
        )
      });
    }

    return (
      <g transform={transform}>{svgTree}</g>
    );
  }
}

module.exports = DataSeries;
