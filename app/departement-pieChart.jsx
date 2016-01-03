module.exports = function(d3, React) {

  var module = {};

  module.init = function(init) {
    this.color = init.color;
    this.radius = init.radius;
  };

  var Chart = React.createClass({
    render: function() {
      return (
        <svg className="pie" viewBox="0 0 81 81" preserveAspectRatio="xMinYMin meet">{this.props.children}</svg>
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
      var amounts = budgets.map(function(budget) { return budget.amount; });
      var sectors = pie(amounts).map(function(point, i) {
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
        return (
          <Chart width={this.props.width} height={this.props.height}>
            <DataSeries data={data} width={this.props.width} height={this.props.height} />
            <text x="6.5em" y="15em" className="text-middle">{data.key.replace(/Department|Dept|DP/gi, '')}</text>
            <text x="6.5em" y="9em" className="text-middle on-chart">{(data.percentage*100).toPrecision(3)+'%'}</text>
            <text x="6.5em" y="11em" className="text-middle on-chart">{(data.values/1000000.0).toPrecision(3) +'M'}</text>
          </Chart>
        );
      }
    });
  };

  return module;
};