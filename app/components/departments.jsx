import React from 'react'
import { render } from 'react-dom'

import piechart from './piechart';

module.exports = function(data, color, radius) {

  var PieChart = piechart(color, radius);

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
