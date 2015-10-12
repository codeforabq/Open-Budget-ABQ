// require dependencies
var React = require('react');
var ReactDOM = require('react-dom');

var d3 = require('d3');

var $ = require('jquery');
var _ = require('lodash');

var bootstrap = require('bootstrap');


var DATA_PATH = 'app/data/budget-first-test.tsv';

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6"]);

function loadBudgetData() {
  var deferred = $.Deferred();

  d3.tsv(DATA_PATH, function(error, cityData) {
    if (error) throw error;

    // keep only the key total
    color.domain(d3.keys(cityData[0]).filter(function(key) { 
      return key == "TOTAL";
    }));

    // aggregate by department/ORGANIZATION
    var departmentData = d3.nest()
    .key(function(d) { return d.ORGANIZATION;})
    .rollup(function(d) { 
     return d3.sum(d, function(g) {return g.TOTAL; });
   })
    .entries(cityData);
    console.log(JSON.stringify(departmentData, null, 2));

    // calculate the city's full annual budget
    var cityBudget = 0;
    departmentData.forEach(function(d) {
      cityBudget += parseFloat(d.values);
    });

    // calculate relative values
    departmentData.forEach(function(d) {
      d.budgets = color.domain().map(function(name) {
        return {name: 'total', amount: +d.values};
      });
      d.budgets.push({name: 'remainder', amount: cityBudget - d.values});
      d.percentage = d.values / cityBudget;
      console.log(JSON.stringify(d, null, 2));
    });

    // resolve the promise and pass the data
    deferred.resolve(departmentData, cityBudget);
  });  

  return deferred.promise();
}

var App;
loadBudgetData().done(function(departmentData, cityBudget) {

  var radius = 74;

  var Chart = React.createClass({
    render: function() {
      return (
        <svg className="pie" width={this.props.width} height={this.props.height}>{this.props.children}</svg>
      );
    }
  });

  var Sector = React.createClass({
    render: function() {
      var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(0);

      return (
        <g className="arc">
          <path d={arc(this.props.data)}></path>
        </g>
      );
    }
  });

  var DataSeries = React.createClass({
    render: function() {
      var pie = d3.layout.pie();
      var amounts = _.map(this.props.data.budgets, function(budget) {
        return budget.amount;
      });
      var bars = _.map(pie(amounts), function(point, i) {
        return (
          <Sector data={point} key={i}/>
        )
      });

      return (
        <g transform="translate(37, 37)">{bars}</g>
        // <g transform="translate(" + radius + ", " + radius + ")">{bars}</g>
      );
    }
  });

  var PieChart = React.createClass({
    getDefaultProps: function() {
      return {
        width: radius * 2,
        height: radius * 2
      };
    },
    render: function() {

      return (
        <Chart width={this.props.width} height={this.props.height}>
          <DataSeries data={this.props.data} width={this.props.width} height={this.props.height}  />
        </Chart>
      );
    }
  });
  
  // var data = [2704659, 4499890, 2159981, 3853788, 14106543, 8819342, 612463]

  departmentData.forEach(function(d) {
    ReactDOM.render(
      <PieChart data={d}/>,
      document.getElementById('container')
    );
  });
});
