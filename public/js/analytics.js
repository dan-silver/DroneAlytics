var faces = [];
var chart, data, options;



function getGenderStats(gender,minAge, maxAge) {
  var numberOf = 0;
  for (i = 0; i < faces.length; i++) {
    if(minAge != null){
      if(faces[i].attribute.age.value <= minAge || faces[i].attribute.age.value >= maxAge){
          break;
      }
    }
    if (faces[i].attribute.gender.value === gender) {
      numberOf++;
    }
  }
  return numberOf;
}

function drawGenderChart(malePercentage, femalePercentage) {
  // Default to 0 if undefined
  // malePercentage = malePercentage || 0;
  // femalePercentage = femalePercentage || 0;

  data = google.visualization.arrayToDataTable([
    ['Gender', 'Percentage'],
    ['Male', malePercentage],
    ['Female', femalePercentage]
  ]);

  options = {
    title: 'Gender Breakdown',
    pieHole: 0.4,
    animation:{
      duration: 1000,
      easing: 'out',
    }
  };

  chart = new google.visualization.PieChart(document.getElementById('genderChart'));
  google.visualization.events.addListener(chart, 'select', function() {
    var selection = chart.getSelection();
  });
  chart.draw(data, options);
  console.log("drawing chart, first time")
}

function getAnalytics() {
  console.log("getAnalytics")
  var numberOfMales = getGenderStats("Male");
  var numberOfFemales = getGenderStats("Female");
  var malePercentage = numberOfMales / faces.length;
  var femalePercentage = numberOfFemales / faces.length;
  updateGenderChart(malePercentage, femalePercentage);
}

function updateGenderChart(malePercentage, femalePercentage) {
  if (data == null) return;
  data.setValue(0,1,malePercentage)
  data.setValue(1,1,femalePercentage)
  chart.draw(data, options)
  console.log("updating chart")
}

google.load("visualization", "1", {packages:["corechart"]});
$(function() {
  google.setOnLoadCallback(drawGenderChart(15,10));
});