'use strict';

import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import d3 from 'd3'

import App from './components/app'
import departments from './components/departments'
import department from './components/department'
import goals from './components/goals'
import goal from './components/goal'

import dataInit from './misc/data-init'

var color = d3.scale.ordinal().range(["#98abc5", "#8a89a6"]);
const DATAPATH = '/app/data/budget-first-test.tsv';
const RADIUS = 40;

/**
 * anonymous called when the data has been initialized
 * @param  object cityData   the data parsed and processed
 * @param  object cityBudget the budget of the city
 */
dataInit(DATAPATH, color)
.done(function(cityData, cityBudget) {
	var Departments = departments(cityData, color, RADIUS),
	    Department = department(cityData);//,
	    // Goals = goals(),
	    // Goal = goal();

	render((
	  <Router history={browserHistory}>
	    <Route path="/" component={App}>
	      <IndexRoute component={Departments} />
	      <Route path="departments" component={Departments} />
	      <Route path="department/:departmentId" component={Department} />
	    </Route>
	  </Router>
	), document.getElementById('react-container'))

});