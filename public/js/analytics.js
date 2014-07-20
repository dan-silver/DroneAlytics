var faces = [];
var genderChart, genderData, genderOptions; 
var ageAndGenderChart, ageAndGenderData;

var groups = [{minAge:13, maxAge:17}, 
              {minAge:18, maxAge:24},
              {minAge:25, maxAge:34},
              {minAge:35, maxAge:44},
              {minAge:45, maxAge:54},
              {minAge:55, maxAge:64},
              {minAge:64, maxAge:130}
            ];

function getGenderStats(gender, minAge, maxAge) {
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

/**
 * Create and populate the data table.
 * Males are above the x-axis.
 * Females are below the x-axis.
*/
function drawAgeAndGenderBreakdownChart() {
    ageAndGenderData = new google.visualization.DataTable();
    ageAndGenderData.addColumn('string', 'age');
    ageAndGenderData.addColumn('number', 'Female');
    ageAndGenderData.addColumn('number', 'Male');

    for (i = 0; i < groups.length; i++) {
      // Get % of males and females in group
      var numberOfMales = getGenderStats('Male', groups[i].minAge, groups[i].maxAge);
      var numberOfFemales = getGenderStats('Female', groups[i].minAge, groups[i].maxAge);
      ageAndGenderData.addRow(numberOfMales / (numberOfMales + numberOfFemales));
    }

    /* Create and draw the visualization. */
    ageAndGenderChart = new google.visualization.ColumnChart(document.getElementById('visualization'));
      ageAndGenderChart.draw(new google.visualization.DataTable(ageAndGenderData), {
        title:"Breakdown by Gender and Age Group",
        isStacked: true,
        vAxis: {
          format: "##;##"
        },
        hAxis: {
          format: "##;##"
        },
        width:600, height:400,
        hAxis: {
          title: "Age"
        },
        vAxis: {
          title: "Number of people"
        }
      }
    );
}


function drawGenderChart(malePercentage, femalePercentage) {
  // Default to 0 if undefined
  // malePercentage = malePercentage || 0;
  // femalePercentage = femalePercentage || 0;

    genderData = new google.visualization.DataTable();
    genderData.addColumn('string', 'Gender');
    genderData.addColumn('number', 'Value');
    genderData.addRow(['Male', 50]);
    genderData.addRow(['Female', 50]);

  genderOptions = {
    title: 'Gender Breakdown',
    pieHole: 0.4,
    width: 400,
    backgroundColor: { fill:'transparent' },
    height: 240,
    vAxis: {minValue:0, maxValue:1200000},
    animation:{
      duration: 1000,
      easing: 'out',
    }
  };

  genderChart = new google.visualization.PieChart(document.getElementById('genderChart'));
  google.visualization.events.addListener(genderChart, 'select', function() {
    var selection = genderChart.getSelection();
  });
  genderChart.draw(genderData, genderOptions);
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
  if (genderData == null) {
    console.log('genderData is null')
    return;
  }
  genderData.setValue(0,1,malePercentage)
  genderData.setValue(1,1,femalePercentage)
  google.visualization.events.addListener(genderChart, 'ready',function () {
    console.log("chart updated")
  })
  genderChart.draw(genderData, genderOptions)
  console.log("updating chart")
}

google.load("visualization", "1", {packages:["corechart"]});
$(function() {
  google.setOnLoadCallback(drawGenderChart(15,10));
  google.setOnLoadCallback(drawAgeAndGenderBreakdownChart);
});