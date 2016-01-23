import React from 'react'
import { render } from 'react-dom'

import utils from '../utils/misc'

import DepartmentDivisions from './departmentDivisions';

module.exports = function(data, color, radius) {

  class Department extends React.Component {

    constructor(props) {
      super(props);
      const { departmentId } = props.params
      
      data = data.filter(function(d) { return utils.getSlugName(d.key) == departmentId })
      if(data.length == 1) {
        this.data = data[0];
      } else {
        console.error('Department view error: more than one data item have the same key name. key name must be unique');
      }
    }

    drawDepartement() {
      return (
        <DepartmentDivisions key={this.data.key} data={this.data} color={color} radius={radius}></DepartmentDivisions>
      );
    }

    render() {
      const { departmentId } = this.props.params
      
      return (
        <div className="department">
          <h1>Department</h1>
          {this.drawDepartement()}
        </div>
      );
    }
  }

  return Department;
};