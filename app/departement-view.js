module.exports = function() {

  var radius = 74,
  padding = 10;

  var color = d3.scale.ordinal()
  .range(["#98abc5", "#8a89a6"]);

  var arc = d3.svg.arc()
  .outerRadius(radius)

  var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) { return d.amount; });


  d3.tsv('app/data/budget-first-test.tsv', function(error, cityData) {
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
      d.budgets.push({name: 'remainder', amount: cityBudget-d.values})
      d.percentage = d.values / cityBudget;
      console.log(JSON.stringify(d, null, 2));
    });

    var svg = d3.select("body").selectAll(".pie")
    .data(departmentData)
    .enter().append("svg")
    .attr("class", "pie")
    .attr("width", radius * 2)
    .attr("height", radius * 2)
    .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

    svg.selectAll(".arc")
    .data(function(d) { 
      return pie(d.budgets); 
    })
    .enter().append("path")
    .attr("class", "arc")
    .attr("d", arc)
    .style("fill", function(d) { return color(d.data.name); });

    // display department name
    svg.append("text")
    .attr("y", "0")
    .style("text-anchor", "middle")
    .text(function(d) { return d.key; });

    // display percentage of total budget
    svg.append("text")
    .attr("y", "1em")
    .style("text-anchor", "middle")
    .text(function(d) { return (d.percentage*100).toPrecision(3)+'%'; });

    // display total in M.
    svg.append("text")
    .attr("y", "3em")
    .style("text-anchor", "middle")
    .text(function(d) { return (d.values/1000000.0).toPrecision(3) +'M'; });

  });
};