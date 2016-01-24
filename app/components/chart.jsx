'use strict'

import React from 'react'
import { render } from 'react-dom'

import utils from '../utils/misc'


class Chart extends React.Component {

  goToDepartmentDetails(event) {
    window.location.href = window.location.origin + '/department/' + utils.getSlugName(this.props.departmentName);
  }

  render() {
    var singleView = this.props.hasOwnProperty('singleView') && this.props.singleView;
    var departmentName = this.props.departmentName,
        data = this.props.data,
        chartType = this.props.chartType,
        numberOfElements = singleView ? data.values.divisions.length : data.values.budgets.length,
        viewBox = chartType == 'pieChart' ? '0 0 81 81' : '0 0 81 ' + (this.props.barHeight*numberOfElements);

    if(singleView) {
      return (
        <svg className={chartType} viewBox={viewBox} preserveAspectRatio="xMinYMin meet">{this.props.children}</svg>
      );
    } else {
      return (
        <svg onClick={this.goToDepartmentDetails.bind(this)} className={chartType} viewBox={viewBox} preserveAspectRatio="xMinYMin meet">{this.props.children}</svg>
      );
    }
  }
}

module.exports = Chart;