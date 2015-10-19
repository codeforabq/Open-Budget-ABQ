module.exports = function(d3, React, _, $) {

  var module = {};

  module.init = function(init) {
    this.color = init.color;
    this.radius = init.radius;
  };

  Chart = React.createClass({
    render: function() {
      return (
        <svg className="pie" width={this.props.width} height={this.props.height}>{this.props.children}</svg>
      );
    }
  });

  var Sector = React.createClass({
    render: function() {
      var arc = d3.svg.arc()
        .outerRadius(module.radius)
        .innerRadius(0);

      var arcStyle = {
        fill: module.color(this.props.name)
      }

      return (
        <g className="arc" style={arcStyle}>
          <path d={arc(this.props.data)}></path>
        </g>
      );
    }
  });

  var DataSeries = React.createClass({
    render: function() {
      var pie = d3.layout.pie();
      var budgets = this.props.data.budgets;
      var amounts = _.map(budgets, function(budget) { return budget.amount; });
      var sectors = _.map(pie(amounts), function(point, i) {
        return (
          <Sector data={point} key={i} name={budgets[i].name}/>
        )
      });

      var transform = 'translate(' + module.radius + ', ' + module.radius + ')';
      return (
        <g transform={transform}>{sectors}</g>
      );
    }
  });

  module.PieChart = function() {
    return React.createClass({
      getDefaultProps: function() {
        // console.log(module.radius);
        return {
          width: module.radius * 2,
          height: module.radius * 2
        };
      },
      render: function() {
        var data = this.props.data;
        var textStyle = {
          textAnchor: 'middle'
        };
        return (
          <Chart width={this.props.width} height={this.props.height}>
            <DataSeries data={data} width={this.props.width} height={this.props.height} />
            <text x="7em" y="8em" style={textStyle}>{data.key}</text>
            <text x="7em" y="12em" style={textStyle}>{(data.percentage*100).toPrecision(3)+'%'}</text>
            <text x="7em" y="13.5em" style={textStyle}>{(data.values/1000000.0).toPrecision(3) +'M'}</text>
          </Chart>
        );
      }
    });
  };

  return module;
};