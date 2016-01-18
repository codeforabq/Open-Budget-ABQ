module.exports = function($, d3) {
  return function(dataPath, color) {
    var deferred = $.Deferred();

    d3.tsv(dataPath, function(error, cityData) {
      if (error) throw error;

      // define the domain
      color.domain(["TOTAL"]);

      // Remove the data with no organization name for the moment
      var cityData = cityData.filter(function(d) {
        return d.ORGANIZATION !== '';
      });

      // aggregate by department/ORGANIZATION
      // TODO: similar division names for:
      // IG-Office of Inspector GenDept division IG-Inspector General is repeated
      // CL-Council Services division CL-Council Svcs is repeated
      // filter them out is a possibility (after "divisions:"))
      // d.filter(function(el, i, arr) { 
      //   if(i > 0) {
      //     return el.DIVISION == arr[i-1].DIVISION ? false : true;
      //   } else {
      //     return true;
      //   }
      // })
      var cityData = d3.nest()
      .key(function(d) { return d.ORGANIZATION.replace(/Department|Dept|DP/gi, '');})
      .rollup(function(d) {
          return {
            total: d3.sum(d, function(g) { return g.TOTAL; }),
            divisions: d.map(function(g) {
             return {
               name: g.DIVISION,
               total: g.TOTAL
             }
           })
          }
        })
      .entries(cityData);

      // calculate the city's full annual budget
      var cityBudget = 0;
      for (var i = 0, l = cityData.length; i < l; i++) {
        cityBudget += parseFloat(cityData[i].values.total);
      }

      // calculate relative values
      for (var i = 0, l = cityData.length; i < l; i++) {
        var d = cityData[i];
        d.values.budgets = [
          { 
            name: 'total', 
            amount: +d.values.total 
          },
          { 
            name: 'remainder', 
            amount: cityBudget - d.values.total 
          }
        ];
        d.values.percentage = d.values.total / cityBudget;
      }

      // console.log(JSON.stringify(cityData, null, 2));

      // resolve the promise and pass the data
      deferred.resolve(cityData, cityBudget);
    });

    return deferred.promise();
  };
};