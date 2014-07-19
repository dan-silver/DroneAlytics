<html>
  <head>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawGenderChart(malePercentage, femalePercentage) {
        var data = google.visualization.arrayToDataTable([
          ['Gender', 'Breakdown'],
          ['Males', malePercentage],
          ['Females', femalePercentage]
        ]);

        var options = {
          title: 'Breakdown by Gender'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }
    </script>
  </head>
  <body>
    <div id="piechart" style="width: 900px; height: 500px;"></div>
  </body>
</html>