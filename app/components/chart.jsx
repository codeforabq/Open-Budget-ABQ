'use strict'

import React from 'react'
import { render } from 'react-dom'

import utils from '../utils/misc'


class Chart extends React.Component {

  goToDepartmentDetails(event) {
    window.location.href = window.location.origin + '/department/' + utils.getSlugName(this.props.departmentName);
  }

  render() {
    var departmentName = this.props.departmentName;

    if(this.props.hasOwnProperty('singleView') && this.props.singleView) {
      return (
        <svg className={this.props.chartType} viewBox="0 0 81 81" preserveAspectRatio="xMinYMin meet">{this.props.children}</svg>
      );
    } else {
      return (
        <svg onClick={this.goToDepartmentDetails.bind(this)} className={this.props.chartType} viewBox="0 0 81 81" preserveAspectRatio="xMinYMin meet">{this.props.children}</svg>
      );
    }
  }
}

module.exports = Chart;