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
    var cityData = d3.nest()
    .key(function(d) { return d.ORGANIZATION;})
    .rollup(function(d) { 
     return d3.sum(d, function(g) {return g.TOTAL; });
   })
    .entries(cityData);
    console.log(JSON.stringify(cityData, null, 2));

    // calculate the city's full annual budget
    var cityBudget = 0;
    cityData.forEach(function(d) {
      cityBudget += parseFloat(d.values);
    });

    // calculate relative values
    cityData.forEach(function(d) {
      d.budgets = color.domain().map(function(name) {
        return {name: 'total', amount: +d.values};
      });
      d.budgets.push({name: 'remainder', amount: cityBudget - d.values});
      d.percentage = d.values / cityBudget;
      console.log(JSON.stringify(d, null, 2));
    });

    // resolve the promise and pass the data
    deferred.resolve(cityData, cityBudget);
  });  

  return deferred.promise();
}

var App;
loadBudgetData().done(function(cityData, cityBudget) {

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
        <g transform="translate(74, 74)">{bars}</g>
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
          <DataSeries data={this.props.data} width={this.props.width} height={this.props.height} />
        </Chart>
      );
    }
  });

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
