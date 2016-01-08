"use strict";

// require dependencies
import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, IndexRoute } from 'react-router'

var d3 = require('d3');
var jqueryDeffered = require('jquery-deferred');
var Button = require('react-bootstrap/lib/Button'); 
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');

var dataInit = require('./data-init')(jqueryDeffered, d3);
var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6"]);
var dataPath = 'app/data/budget-first-test.tsv';

/**
 * anonymous called when the data has been initialized
 * @param  object cityData   the data parsed and processed
 * @param  object cityBudget the budget of the city
 */
dataInit(dataPath, color).done(function(cityData, cityBudget) {
  var pieChartModule = require('./departement-pieChart.jsx')(d3, React);

  pieChartModule.init({
    color: color,
    radius: 40
  });

  var PieChart = pieChartModule.PieChart();

  class Departments extends React.Component {
    constructor() {
      super();
      this.state = {
        cityData: cityData
      };
    }

    eachDepartement(departmentData, i) {
      return (
        <PieChart key={i} index={i} data={departmentData}></PieChart>
      );
    }

    render() {
      return (
        <div className="departments">
          <div className="chart-container">
            {this.state.cityData.map(this.eachDepartement)}
          </div>
        </div> 
      );
    }
  }

  class Department extends React.Component {
    render() {
      console.log('Department');
      const { departmentID } = this.props.params

      return (
        <div className="department">
          <h1>Department</h1>
        </div>
      );
    }
  }

  class Goals extends React.Component {
    render() {
      return (
        <div>
        </div>
      )
    }
  }

  class Hamburger extends React.Component {
    constructor() {
      super();
      this.state = {
        active: false
      }
    }

    setFilter(filter) {
      this.setState({active: filter})
    }

    isActive() {
      return 'menu-items ' + (this.state.active ? 'active' : '');
    }

    render() {
      return (
        <div className="Hamburger-menu-wrapper">
          <div className='hamburger-menu' onClick={this.setFilter.bind(this, !this.state.active)}><i className="fa fa-bars"></i></div>
          <ul className={this.isActive()}>
            <li><Link>Pie charts</Link></li>
            <li><Link>Bar charts</Link></li>
          </ul>
        </div>
      );
    }
  }

  class TopMenu extends React.Component {
    loadGoalsView() {
      window.location.href = window.location.origin + '/goals';
    }

    loadDepartmentsView() {
      window.location.href = window.location.origin + '/departments';
    }

    render() {
      return (
        <div className="top-container">
          <h1>ABQ Open Budget</h1>
          <Hamburger/>
          <ButtonGroup>
            <Button className="budget-type" onClick={this.loadGoalsView}>Goals</Button>
            <Button className="budget-type" onClick={this.loadDepartmentsView}>Departments</Button>
            <Button className="search"><i className="fa fa-search"></i></Button>
          </ButtonGroup>
        </div>
      )
    }
  }

  class App extends React.Component {
    render() {
      return (
        <div className="app">
          <TopMenu/>
          <div className="content-container">{this.props.children}</div>
        </div>
      )
    }
  }

  render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Goals} />
        <Route path="goals" component={Goals} />
        <Route path="departments" component={Departments} >
          <Route path="/:departmentID" component={Department} />
        </Route>
      </Route>
    </Router>
  ), document.getElementById('react-container'))

});
