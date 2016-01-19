import React from 'react'
import { render } from 'react-dom'

import charts from './charts';

module.exports = function(data, color, radius) {

  charts.init({
    color: color,
    radius: radius
  });

  var PieChart = charts.PieChart();

  class Departments extends React.Component {

    constructor() {
      super();
      this.state = {
        data: data
      };
    }

    eachDepartement(departmentData, i) {
      return (
        <PieChart key={i} index={i} data={departmentData}></PieChart>
      );
    }

    render() {
      return (
        <div className="departments">
          <div className="chart-container">
            {this.state.data.map(this.eachDepartement)}
          </div>
        </div> 
      );
    }
  }

  return Departments;
};
