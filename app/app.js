// require dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');
var $ = require('jquery');
var _ = require('lodash');
var bootstrap = require('bootstrap');

var dataInit = require('./data-init')($);
var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6"]);
var dataPath = 'app/data/budget-first-test.tsv';

/**
 * anonymous called when the data has been initialized
 * @param  object cityData   the data parsed and processed
 * @param  object cityBudget the budget of the city
 */
dataInit(dataPath, color)
.done(function(cityData, cityBudget) {
  var pieChartModule = require('./departement-pieChart.jsx')(d3, React, _, $);
  pieChartModule.init({
    color: color,
    radius: 74
  });

  var PieChart = pieChartModule.PieChart();

  var DepartmentView = React.createClass({
    getInitialState: function() {
        return {
            cityData: cityData
        };
    },
    eachDepartement: function(departmentData, i) {
      return (
        <PieChart key={i} index={i} data={departmentData}></PieChart>
      );
    },
    render: function() {
      return (
        <div className="department">
          {this.state.cityData.map(this.eachDepartement)}
        </div> 
      );
    }
  });
  
  ReactDOM.render(<DepartmentView />, document.getElementById('react-container'));
});
