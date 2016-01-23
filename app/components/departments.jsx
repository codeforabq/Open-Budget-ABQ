import React from 'react'
import { render } from 'react-dom'
import d3 from 'd3'

import DepartmentOverview from './departmentOverview';


module.exports = function(data, colorRange, radius, cityBudget) {
  
  class Departments extends React.Component {

    constructor() {
      super();
      this.data = data;
    }

    drawDepartementOverview(departmentData, i) {
      var colors = d3.scale.linear().domain([0, cityBudget]).range(colorRange);
      
      return (
        <DepartmentOverview key={i} index={i} data={departmentData} colors={colors} radius={radius}></DepartmentOverview>
      );
    }

    render() {
      return (
        <div className="departments">
          <div className="chart-container">
            {this.data.map(this.drawDepartementOverview)}
          </div>
        </div> 
      );
    }
  }

  return Departments;
};
