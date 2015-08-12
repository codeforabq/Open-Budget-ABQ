	<footer>
		
		<div class="label-right">
			<span id="current-percent"></span>%
		</div>	

		<div class="label-right">
			<div id="chart-number-total" class="current-number"></div>
		</div>

		<div class="label-right">
			<span class="budget-total"> of $7,186,474,597</span>
		</div>

		<div class="label-right">
			<a onclick="dc.filterAll();dc.redrawAll();">Reset Filters</a>
		</div>

	</footer>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="js/lib/crossfilter.min.js"></script>
	<script type="text/javascript" src="js/lib/dc.min.js"></script>
	<!--[if lte IE 9]><script src="js/lib/aight.min.js"></script><![endif]-->
	<!--[if IE 8]><script src="js/d3.ie8.js"></script><![endif]-->

	<script src="js/budget-explorer.js"></script>
</body>
</html>