import utils from './utils/misc'

module.exports = function(d3, React) {

  var module = {};

  module.init = function(init) {
    this.color = init.color;
    this.radius = init.radius;
  };

  class Chart extends React.Component {
    showDepartmentDetails(event) {
      console.log(this.props.departmentName);
      var departmentSlug = utils.getSlugName(this.props.departmentName);
      window.location.href = window.location.origin + '/department/' + departmentSlug
    }

    render() {
      var departmentName = this.props.departmentName;
      return (
        <svg onClick={this.showDepartmentDetails.bind(this)} className="pie" viewBox="0 0 81 81" preserveAspectRatio="xMinYMin meet">{this.props.children}</svg>
      );
    }
  }

  class Sector extends React.Component {
    constructor() {
      super();
      this.state = {
        hovered: false
      }
    }

    setFilter(filter) {
      this.setState({hovered: filter})
    }

    isHovered() {
      return 'arc ' + (this.state.hovered ? 'sector-hovered' : '');
    }

    render() {
      var arc = d3.svg.arc()
        .outerRadius(module.radius)
        .innerRadius(0);

      var arcStyle = {
        fill: module.color(this.props.name),
      }

      return (
        <g className={this.isHovered()} style={arcStyle} 
        onMouseEnter={this.setFilter.bind(this, true)} 
        onMouseLeave={this.setFilter.bind(this, false)}>
          <path d={arc(this.props.data)}></path>
        </g>
      );
    }
  };

  class DataSeries extends React.Component {
    render() {
      var pie = d3.layout.pie();
      var budgets = this.props.data.values.budgets;
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
  }

  // module.PieChart = function() {
  module.PieChart = function() {
    class PieChart extends React.Component {

      render() {
        var data = this.props.data,
            departmentName = data.key,
            departmentArr = departmentName.split(/\s{1}/),
            departmentNamePart1 = departmentArr[0],
            departmentNamePart2 = departmentArr.splice(1).join(' ');
        return (
          <Chart width={this.props.width} height={this.props.height} departmentName={departmentName}>
            <DataSeries data={data} width={this.props.width} height={this.props.height} />
            <text x={module.radius} y={this.props.height+15} className="text-middle">{departmentNamePart1}</text>
            <text x={module.radius} y={this.props.height+30} className="text-middle">{departmentNamePart2}</text>
            <text x={module.radius} y={this.props.height-25} className="text-middle on-chart">{(data.values.percentage*100).toPrecision(3)+'%'}</text>
            <text x={module.radius} y={this.props.height-10} className="text-middle on-chart">{(data.values.total/1000000.0).toPrecision(3) +'M'}</text>
          </Chart>
        );
      }
    }

    PieChart.defaultProps = {
      width: module.radius * 2,
      height: module.radius * 2
    }

    return PieChart;

  };

  // module.PieChart = PieChart;
  return module;
};