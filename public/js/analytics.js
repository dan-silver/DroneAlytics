var faces = [];
var genderChart, genderData, genderOptions; 
var ageAndGenderChart, ageAndGenderData, ageAndGenderOptions;

var groups = [{minAge:13, maxAge:17}, 
              {minAge:18, maxAge:24},
              {minAge:25, maxAge:34},
              {minAge:35, maxAge:44},
              {minAge:45, maxAge:54},
              {minAge:55, maxAge:64},
              {minAge:64, maxAge:130}
            ];

function getGenderStats(gender, minAge, maxAge) {
  console.log(gender)
  var numberOf = 0;

  var i = 0;
  var j = faces.length
  while(i < j) {
    console.log(faces)
    j = faces.length;
    console.log(i)
    console.error(faces[i])
    if(minAge != null){
      if(faces[i].attribute.age.value < minAge || faces[i].attribute.age.value > maxAge){
          i++;
          continue;
      }
    }
    if (faces[i].attribute.gender.value == gender) {
      numberOf++;
    }

    i++;
    console.log("J IS " + j)
    }
  return numberOf;
}


function drawGenderChart() {
  // Default to 0 if undefined
    genderData = new google.visualization.DataTable();
    genderData.addColumn('string', 'Gender');
    genderData.addColumn('number', 'Value');
    genderData.addRow(['Male', 50]);
    genderData.addRow(['Female', 50]);

  genderOptions = {
    pieHole: 0.4,
    width: 800,
    backgroundColor: { fill:'transparent' },
    height: 500,
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
    // console.log('genderData is null')
    return;
  }
  genderData.setValue(0,1,malePercentage)
  genderData.setValue(1,1,femalePercentage)
  google.visualization.events.addListener(genderChart, 'ready',function () {
    // console.log("chart updated")
  })
  genderChart.draw(genderData, genderOptions)
  // console.log("updating chart")
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
    ageAndGenderData.addRow([groups[i].minAge + " - " + groups[i].maxAge, -5, 5]);
  }
  ageAndGenderOptions = {
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
  };
  /* Create and draw the visualization. */
  ageAndGenderChart = new google.visualization.ColumnChart(document.getElementById('visualization'));
  ageAndGenderChart.draw(ageAndGenderData, ageAndGenderOptions);
}

function updateAgeAndGenderChart() {
  if (ageAndGenderData == null) {
    console.error('ageAndGenderData is null')
    return;
  }

  for (i = 0; i < groups.length; i++) {
    console.error('UPDATING GROUP ' + i)
    ageAndGenderData.setValue(i, 1, getGenderStats('Male', groups[i].minAge, groups[i].maxAge));
    ageAndGenderData.setValue(i, 2, getGenderStats('Female', groups[i].minAge, groups[i].maxAge));
  }

  google.visualization.events.addListener(ageAndGenderChart, 'ready',function () {
    console.log("chart updated")
  })

  ageAndGenderChart.draw(ageAndGenderData, ageAndGenderOptions)
}



google.load("visualization", "1", {packages:["corechart"]});
$(function() {
  google.setOnLoadCallback(drawGenderChart());
  google.setOnLoadCallback(drawAgeAndGenderBreakdownChart());
});