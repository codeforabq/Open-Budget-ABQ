'use strict'

import React from 'react'
import { render } from 'react-dom'

import utils from '../utils/misc.js'


class Chart extends React.Component {

  showDepartmentDetails(event) {
    console.log(this.props.departmentName);
    var departmentSlug = utils.getSlugName(this.props.departmentName);
    window.location.href = window.location.origin + '/department/' + departmentSlug
  }

  render() {
    var departmentName = this.props.departmentName,
        className = this.props.pieChart ? 'pie' : 'bar';
    return (
      <svg onClick={this.showDepartmentDetails.bind(this)} className={} viewBox="0 0 81 81" preserveAspectRatio="xMinYMin meet">{this.props.children}</svg>
    );
  }
}

module.exports = Chart;