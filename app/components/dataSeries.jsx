'use strict'

import React from 'react'
import { render } from 'react-dom'
import d3 from 'd3'

import Sector from './sector'


class DataSeries extends React.Component {

  render() {
    var pie = d3.layout.pie(),
        classRef = this,
        dataForPie = null,
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
      svgTree = pie(amounts).map(function(point, i) {
        return (
          <Sector data={point} colors={classRef.props.colors} radius={classRef.props.radius} key={i} name={dataForPie[i].name}/>
        )
      });
    } else {

      svgTree = dataForPie.map(function(d, i) {
        var transform = 'translate(0, ' + (i*barHeight) + ')';
        return (
          <g transform={transform} key={i}>
            <rect width={100} height={barHeight-1}></rect>
          </g>
        )
      });
    }

    return (
      <g transform={transform}>{svgTree}</g>
    );
  }
}

module.exports = DataSeries;
