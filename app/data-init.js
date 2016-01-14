module.exports = function($, d3) {
  return function(dataPath, color) {
    var deferred = $.Deferred();

    d3.tsv(dataPath, function(error, cityData) {
      if (error) throw error;

      color.domain(["TOTAL"]);

      // Remove the data with no organization name for the moment
      var cityData = cityData.filter(function(d) {
        return d.ORGANIZATION !== '';
      });

      // aggregate by department/ORGANIZATION
      cityData = d3.nest()
      .key(function(d) { return d.ORGANIZATION;})
      .rollup(function(d) { 
         return d3.sum(d, function(g) {return g.TOTAL; });
       })
      .entries(cityData);


      // calculate the city's full annual budget
      var cityBudget = 0;
      for (var i = 0, l = cityData.length; i < l; i++) {
        cityBudget += parseFloat(cityData[i].values);
      }

      // calculate relative values
      for (var i = 0, l = cityData.length; i < l; i++) {
        var d = cityData[i];
        d.budgets = color.domain().map(function(name) {
          return {name: 'total', amount: +d.values};
        });
        d.budgets.push({name: 'remainder', amount: cityBudget - d.values});
        d.percentage = d.values / cityBudget;
      }
        
      // console.log(JSON.stringify(cityData, null, 2));
      // resolve the promise and pass the data
      deferred.resolve(cityData, cityBudget);
    });  
    return deferred.promise();
  };
};