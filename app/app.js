


var radius = 74,
    padding = 10;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6"]);

var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - 30);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.TOTAL; });


d3.tsv('data/budget-first-test.tsv', function(error, data) {
  if (error) throw error;

  // keep only the key total
  color.domain(d3.keys(data[0]).filter(function(key) { 
    return key == "TOTAL";
  }));
  // console.log(JSON.stringify(color.domain()));  

  // calculate the grand total
  var grandTotal = 0;
  data.forEach(function(d) {
    grandTotal += parseFloat(d.TOTAL);
  });

  data.forEach(function(d) {
    d.budgets = color.domain().map(function(name) {
      return {name: 'total', budget: +d[name]};
    });
    d.budgets.push({name: 'grandTotal', budget: grandTotal})
    // console.log(JSON.stringify(d, null, 2));
  });

  var svg = d3.select("body").selectAll(".pie")
      .data(data)
    .enter().append("svg")
      .attr("class", "pie")
      .attr("width", radius * 2)
      .attr("height", radius * 2)
    .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

  // svg.selectAll(".arc")
  //     .data(function(d) { return pie(d.budgets); })
  //   .enter().append("path")
  //     .attr("class", "arc")
  //     .attr("d", arc)
  //     .style("fill", function(d) { return color(d.data.name); });

  // svg.append("text")
  //     .attr("dy", ".35em")
  //     .style("text-anchor", "middle")
  //     .text(function(d) { return d.ORGANIZATION; });

});
