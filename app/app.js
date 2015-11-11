// require dependencies
var React = require('react');
var ReactDOM = require('react-dom');
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
dataInit(dataPath, color)
.done(function(cityData, cityBudget) {
  var pieChartModule = require('./departement-pieChart.jsx')(d3, React);
  pieChartModule.init({
    color: color,
    radius: 40
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
        <div className="department-view">
          <ButtonGroup>
            <Button>Goals</Button>
            <Button>Departments</Button>
            <Button><i className="icon-search"></i></Button>
          </ButtonGroup>
          <div className="chart-container">
            {this.state.cityData.map(this.eachDepartement)}
          </div>
        </div> 
      );
    }
  });

  ReactDOM.render(<DepartmentView />, document.getElementById('react-container'));
});
