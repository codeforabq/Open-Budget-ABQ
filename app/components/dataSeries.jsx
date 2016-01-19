'use strict'

import React from 'react'
import { render } from 'react-dom'
import d3 from 'd3'

import Sector from './sector'


class DataSeries extends React.Component {
  render() {
    var pie = d3.layout.pie(),
        budgets = this.props.data.values.budgets,
        amounts = budgets.map(function(budget) { return budget.amount; }),
        classRef = this,
        sectors = pie(amounts).map(function(point, i) {
          return (
            <Sector data={point} color={classRef.props.color} radius={classRef.props.radius} key={i} name={budgets[i].name}/>
          )
        }),

        transform = 'translate(' + this.props.radius + ', ' + this.props.radius + ')';

    return (
      <g transform={transform}>{sectors}</g>
    );
  }
}

module.exports = DataSeries;
