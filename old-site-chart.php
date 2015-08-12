<?php require_once('header.php'); ?>

<div class="container">

    <!-- D3 Visualisation -->
    <div id="row-charts" class="row">
        <div id="department" class="col-xs-4">
            <hr>
            <p span class="section-title">Choose a Department <span class="glyphicon glyphicon-question-sign"></span>
            <hr>
            </p>
            <section id="chart-row-dept"></section>
        </div>
        <div id="funding" class="col-xs-4">
            <section id="chart-row-fund"><hr>
                <p span class="section-title">Funding Source <span class="glyphicon glyphicon-question-sign"></span></p>
                <hr>
            </section>
        </div>
        <div id="category" class="col-xs-4">
            <section id="chart-bar-char"><hr>
                <p span class="section-title">Category <span class="glyphicon glyphicon-question-sign"></span></p>
                <hr>
            </section>
        </div>
    </div>
    
    <!-- create a custom header -->
    <div id="data-table" class="row">
        <section id="data-count">
            <span class="filter-count"></span> selected out of
            <span class="total-count"></span> records
        </section>
        <p span class="section-title">Sub-Category Items (determined by selections above):</p>
        <hr>
        <table class="table table-hover table-striped" id="chart-table-activity">
            <thead>
            <tr class="header">
                <th>Department</th>
                <th>Activity</th>
                <th>Category</th>
                <th>Fund</th>
                <th>Budget</th>
            </tr>
            </thead>
        </table>
    </div>
</div><!-- end container -->
    
<?php require_once('footer.php'); ?>
