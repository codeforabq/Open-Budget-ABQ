// NAME OUR CHARTS
var dataCountTop    = dc.dataCount("#data-count-top"),
    budgetRingChart = dc.pieChart("#chart-ring-budget"),
    deptRowChart    = dc.rowChart("#chart-row-dept"),
    dataCount       = dc.dataCount("#data-count"),
    actTableChart   = dc.dataTable("#chart-table-activity"),
    numberTotal     = dc.numberDisplay("#chart-number-total"),
    charBarChart    = dc.rowChart("#chart-bar-char"),
    fundRowChart    = dc.rowChart("#chart-row-fund"),
    currentPercent  = dc.numberDisplay('#current-percent');

// LOAD OUR DATA
var myData = d3.csv('data/14budget.csv', function(budgetData){

    // SET CROSSFILTER
    var ndx = crossfilter(budgetData),

        all                 = ndx.groupAll(),
        sumAll              = ndx.groupAll().reduceSum(function(d) {return +d.budget}),

        budgetDim           = ndx.dimension(function(d) {return Math.floor(d.budget/1000000);}),
        deptDim             = ndx.dimension(function(d) {return d.Department_Title;}),
        charDim             = ndx.dimension(function(d) {return d.Character_Title;}),
        actDim              = ndx.dimension(function(d) {return d.SubObjTitle;}),
        fundDim             = ndx.dimension(function(d) {return d.Fund_Title;}),

        totalBudget         = budgetDim.group().reduceSum(function(d) {return +d.budget}),
        spendPerDeptDim     = deptDim.group().reduceSum(function(d) {return +d.budget;}),
        spendPerCharDim     = charDim.group().reduceSum(function(d) {return +d.budget;}),
        spendPerActDim      = actDim.group().reduceSum(function(d) {return +d.budget;}),
        spendPerFundDim     = fundDim.group().reduceSum(function(d) {return +d.budget;});

    var format = d3.format(' ^$,.0f');
    var formatRight = d3.format(' >$,.0f');
    var min                 = budgetDim.bottom(1)[0].budget,
        max                 = budgetDim.top(1)[0].budget;
    
    
    //TODO dynamic dept title renderal
    //TODO calc % YoY change
    numberTotal
        .formatNumber(d3.format(" ^$,.r"))
        .valueAccessor(function(d) {return sumAll.value();})
        .group(spendPerDeptDim);

    // percent
    currentPercent
        .formatNumber(d3.format("."))
        .valueAccessor(function(d) {return (sumAll.value() * 100 / 7186474597).toFixed(1);})
        .group(spendPerDeptDim);

    budgetRingChart
        .width(150).height(150)
        .dimension(fundDim)
        .group(spendPerFundDim)
        .colors(['#A8BF12'])
        .renderLabel(false)
        .innerRadius(50);

    deptRowChart
        .width(340).height(1100)
        .dimension(deptDim)
        .colors(['#008cba'])
        .group(spendPerDeptDim)
        .margins({top: 0, right: 20, bottom: 20, left: 0})
        .ordering(function(d) { return -d.value; }) //this was buried in docs, not in API reference for v1.7.0, submitted PR
        .gap(3)
        .labelOffsetX([5])
        .labelOffsetY([13]);

    fundRowChart
        .width(340).height(450)
        .dimension(fundDim)
        .group(spendPerFundDim)
        .colors(['#008cba'])
        .ordering(function(d) { return -d.value; })
        .elasticX(true)
        .labelOffsetX([5])
        .labelOffsetY([20])
        .margins({top: 0, right: 20, bottom: 0, left: 0})
        .gap(3);

    charBarChart
        .width(340).height(450)
        .dimension(charDim)
        .group(spendPerCharDim)
        .colors(['#008cba'])
        .ordering(function(d) { return -d.value; })
        .labelOffsetX([5])
        .labelOffsetY([35])
        .margins({top: 0, right: 0, bottom: 0, left: 0})
        .gap(3);

    dataCount
        .dimension(ndx) // set dimension to all data
        .group(all); // set group to ndx.groupAll()

    dataCountTop
        .dimension(ndx) // set dimension to all data
        .group(all); // set group to ndx.groupAll()

    actTableChart
        .dimension(budgetDim)
        .group(function(d) { return null; })
        .size(12)
        .columns([
            function(d) { return d.Department_Title;},
            function(d) { return d.Fund_Title; },
            function(d) { return d.Character_Title; },
            function(d) { return d.SubObjTitle; },
            function(d) { return formatRight(d.budget); }
                ])
        .sortBy(function(d) {
                return d.Department_Title;
            })
        .order(d3.ascending);
    dc.renderAll();
});