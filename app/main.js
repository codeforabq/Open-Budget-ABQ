'use strict';

import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import d3 from 'd3'

import App from './components/app'
import departments from './components/departments'
import Department from './components/department'
import Goals from './components/goals'
import Goal from './components/goal'

import dataInit from './data-init'


var color = d3.scale.ordinal().range(["#98abc5", "#8a89a6"]);
var dataPath = '/app/data/budget-first-test.tsv';

/**
 * anonymous called when the data has been initialized
 * @param  object cityData   the data parsed and processed
 * @param  object cityBudget the budget of the city
 */
dataInit(dataPath, color)

.done(function(cityData, cityBudget) {
	departments.init(cityData);
	var Departments = departments.Departments;

	render((
	  <Router history={browserHistory}>
	    <Route path="/" component={App}>
	      <IndexRoute component={Departments} />
	      <Route path="goals" component={Goals} />
	      <Route path="departments" component={Departments} />
	      <Route path="department/:departmentId" component={Department} />
	    </Route>
	  </Router>
	), document.getElementById('react-container'))

});