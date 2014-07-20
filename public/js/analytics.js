var faces = [];

function getMales() {
  var numberOfMales = 0;
  for (i = 0; i < faces.length; i++) {
    if (faces[i].attribute.gender.value === 'male') {
      numberOfMales++;
    }
  }
  return numberOfMales;
}

function getFemales() {
  var numberOfFemales = 0;
  for (i = 0; i < faces.length; i++) {
    if (faces[i].attribute.gender.value === 'female') {
      numberOfFemales++;
    }
  }
  return numberOfFemales;
}

function drawGenderChart(malePercentage, femalePercentage) {
  // Default to 0 if undefined
  malePercentage = malePercentage || 0;
  femalePercentage = femalePercentage || 0;

  var data = google.visualization.arrayToDataTable([
    ['Gender', 'Percentage'],
    ['Male', malePercentage],
    ['Female', femalePercentage]
  ]);

  var options = {
    title: 'Gender Breakdown',
    pieHole: 0.4,
  };

  var chart = new google.visualization.PieChart(document.getElementById('genderChart'));
  chart.draw(data, options);
}

function getAnalytics() {
  var numberOfMales = getMales(faces);
  var numberOfFemales = getFemales(faces);
  var malePercentage = numberOfMales / faces.length;
  var femalePercentage = numberOfFemales / faces.length;
  drawGenderChart(malePercentage, femalePercentage);
}

google.load("visualization", "1", {packages:["corechart"]});
$(function() {
  google.setOnLoadCallback(getAnalytics);
});