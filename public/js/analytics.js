function drawRaceChart() {
  var data = google.visualization.arrayToDataTable([
    ['Gender', 'Percentage'],
    ['Male', 60],
    ['Female', 40]
  ]);

  var options = {
    title: 'Gender Breakdown',
    pieHole: 0.4,
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}

google.load("visualization", "1", {packages:["corechart"]});

$(function() {
  google.setOnLoadCallback(drawRaceChart);
});