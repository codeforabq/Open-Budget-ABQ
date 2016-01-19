'use strict'

import React from 'react'
import { render } from 'react-dom'


class Chart extends React.Component {

  showDepartmentDetails(event) {
    console.log(this.props.departmentName);
    var departmentSlug = utils.getSlugName(this.props.departmentName);
    window.location.href = window.location.origin + '/department/' + departmentSlug
  }

  render() {
    var departmentName = this.props.departmentName;
    return (
      <svg onClick={this.showDepartmentDetails.bind(this)} className="pie" viewBox="0 0 81 81" preserveAspectRatio="xMinYMin meet">{this.props.children}</svg>
    );
  }
}

module.exports = Chart;