import React from 'react'
import { render } from 'react-dom'

import DepartmentOverview from './departmentOverview';


module.exports = function(data, color, radius) {
  
  class Departments extends React.Component {

    constructor() {
      super();
      this.data = data;
    }

    drawDepartementOverview(departmentData, i) {
      return (
        <DepartmentOverview key={i} index={i} data={departmentData} color={color} radius={radius}></DepartmentOverview>
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
