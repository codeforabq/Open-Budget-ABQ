// require dependencies
var React = require('react');
var d3 = require('d3');
var $ = require('jquery');
var bootstrap = require('bootstrap');

// var Chart = require('./Chart.jsx');

// var sampleData = [
//   {id: '5fbmzmtc', x: 7, y: 41, z: 6},
//   {id: 's4f8phwm', x: 11, y: 45, z: 9},
//   // ...
// ];

function loadBudgetData() {
  var deferred = $.Deferred();

  d3.tsv('app/data/budget-first-test.tsv', function(error, data) {
    if (error) throw error;

    // resolve the promise and pass the data
    deferred.resolve(data);
  });  

  return deferred.promise();
}

var App;
loadBudgetData().done(function(data) {
  // App = React.createClass({
  //   getInitialState: function() {
  //     var colorRange = d3.scale.ordinal()
  //         .range(["#98abc5", "#8a89a6"]);

  //     // keep only the key total
  //     colorRange.domain(d3.keys(cityData[0]).filter(function(key) { 
  //       return key == "TOTAL";
  //     }));

  //     return {
  //       data: data,
  //       colorRange: colorRange,
  //       radius: 74,
  //     };
  //   },

  //   render: function() {
  //     return (
  //       <div className="App">
  //         <Chart
  //           data={this.state.data}
  //           domain={this.state.colorRange}
  //           domain={this.state.radius} />
  //       </div>
  //     );
  //   }
  // });

  // React.renderComponent(App(), document.body);




  // var svg = d3.select("body").selectAll(".pie")
  //     .data(departmentData)
  //   .enter().append("svg")
  //     .attr("class", "pie")
  //     .attr("width", radius * 2)
  //     .attr("height", radius * 2)
  //     .append("g")
  //     .attr("transform", "translate(" + radius + "," + radius + ")");

  var radius = 74;

  var Chart = React.createClass({
    render: function() {
      return (
        <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
      );
    }
  });

  var Sector = React.createClass({
    render: function() {
      var arc = d3.svg.arc()
        .outerRadius(240)
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

      var pie = d3.layout.pie()
      var bars = _.map(pie(this.props.data), function(point, i) {
        return (
          <Sector data=key{point} ={i}/>
        )
      });

      return (
        <g transform="translate(480, 250)">{bars}</g>
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
          <DataSeries data={data} width={this.props.width} height={this.props.height}  />
        </Chart>
      );
    }
  });
  
  var data = [2704659, 4499890, 2159981, 3853788, 14106543, 8819342, 612463]

  React.renderComponent(
    <PieChart data={data}/>,
    document.getElementById('container')
  );
});
