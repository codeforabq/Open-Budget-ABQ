import React from 'react'
import { render } from 'react-dom'

import utils from '../utils/misc'

module.exports = function(data) {

  class Department extends React.Component {

    constructor() {
      super();
      this.state = {
        data: data
      };
    }

    render() {
      console.log(data);
      const { departmentId } = this.props.params
      var data = this.state.data.filter(function(d) { return utils.getSlugName(d.key) == departmentId })
      if(data.length == 1) {
        data = data[0];
      } else {
        console.error('Department view error: more than one data item have the same key name. key name must be unique');
      }

      console.log(JSON.stringify(data, null, 2));

      return (
        <div className="department">
          <h1>Department</h1>
        </div>
      );
    }
  }

  return Department;
};