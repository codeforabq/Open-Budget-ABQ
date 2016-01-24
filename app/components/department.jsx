import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

import utils from '../utils/misc'

import DepartmentDivisions from './departmentDivisions';
import DepartmentDetails from './departmentDetails';

module.exports = function(data, radius, barHeight) {

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

    render() {
      const TOTAL  = this.data.values.total,
            RANGE  = ['#f2f2fc', '#9ecae1', '#6baed6', '#fd8d3c'],
            DOMAIN = [0, TOTAL/20, TOTAL/18, TOTAL/4];

      var colors = d3.scale.linear().domain(DOMAIN).range(RANGE);

      return (
        <div className="department">
          <h1>{this.data.key}</h1>
          <DepartmentDivisions data={this.data} colors={colors} radius={radius}></DepartmentDivisions>
          <DepartmentDetails data={this.data} colors={colors} radius={radius} barHeight={barHeight}></DepartmentDetails>
          <Link to="/departments">Back to Departments</Link>
        </div>
      );
    }
  }

  return Department;
};