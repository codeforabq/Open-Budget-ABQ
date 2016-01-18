import React from 'react'
import { render } from 'react-dom'

import charts from './charts';

var departments = {};

departments.init = function(data) {
  this.data = data;
}

charts.init({
  color: color,
  radius: 40
});

var PieChart = charts.PieChart();

class Departments extends React.Component {

  constructor() {
    super();
    this.state = {
      data: departments.data
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

departments.Departments = Departments;

module.exports = departments;