var faces = [];
var genderChart, genderData, genderOptions; 
var ageAndGenderChart, ageAndGenderData, ageAndGenderOptions;
var raceChart, raceData, raceOptions;



var colors = ["#D36447", "#316A85","#D39247",  "#33965E"]

var groups = [{minAge:13, maxAge:17}, 
              {minAge:18, maxAge:24},
              {minAge:25, maxAge:34},
              {minAge:35, maxAge:44},
              {minAge:45, maxAge:54},
              {minAge:55, maxAge:64},
              {minAge:64, maxAge:130}
            ];

function getGenderStats(gender, minAge, maxAge, race) {
  //console.log(gender)
  var numberOf = 0;

  var i = 0;
  var j = faces.length
  while(i < j) {
    //console.log(faces)
    j = faces.length;
    //console.log(i)
    //console.error(faces[i])
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
    //console.log("J IS " + j)
  }
  return numberOf;
}

function drawRaceChart() {
  raceData = new google.visualization.DataTable();
  raceData.addColumn('string', 'Race');
  raceData.addColumn('number', 'Value');

  // init default values
  raceData.addRow(['White', 100])
  raceData.addRow(['Black', 0])
  raceData.addRow(['Indian', 0])

  raceOptions = {
    pieHole: 0.4,
    backgroundColor: { fill:'transparent' },
    height: 500,
    vAxis: {minValue:0, maxValue:1200000},
    animation:{
      duration: 1000,
      easing: 'out',
    },
    colors: colors
  };

  raceChart = new google.visualization.PieChart(document.getElementById('raceChart'));

  raceChart.draw(raceData, raceOptions);

  console.log("drawing race chart, first time")
  // google.visualization.events.addListener(raceChart, 'select', function() {
  //   var selection = raceChart.getSelection();
  //   console.log(selection);

  //   raceChart.draw(raceData, raceOptions);
  //   console.log("drawing race chart, first time")
  // });
}

function updateRaceChart() {
  return;
 if (raceData == null) {
    return;
  }

  google.visualization.events.addListener(raceChart, 'ready',function () {
    // console.log("race chart updated")
  })
  
  for (i = 0; i < groups.length; i++) {
    raceData.setValue(i, 1, getGenderStats('Male', groups[i].minAge, groups[i].maxAge, 'white'));
    raceData.setValue(i, 2, getGenderStats('Female', groups[i].minAge, groups[i].maxAge, 'white'));

    raceData.setValue(i, 1, getGenderStats('Male', groups[i].minAge, groups[i].maxAge, 'black'));
    raceData.setValue(i, 2, getGenderStats('Female', groups[i].minAge, groups[i].maxAge, 'black'));

    raceData.setValue(i, 1, getGenderStats('Male', groups[i].minAge, groups[i].maxAge, 'asian'));
    raceData.setValue(i, 2, getGenderStats('Female', groups[i].minAge, groups[i].maxAge, 'asian'));
  }
}

function drawGenderChart() {
  genderData = new google.visualization.DataTable();
  genderData.addColumn('string', 'Race');
  genderData.addColumn('number', 'Value');
  genderData.addRow(['Male', 50]);
  genderData.addRow(['Female', 50]);

  genderOptions = {
    pieHole: 0.4,
    backgroundColor: { fill:'transparent' },
    height: 500,
    vAxis: {minValue:0, maxValue:1200000},
    animation:{
      duration: 1000,
      easing: 'out',
    },
    colors: colors
  };

  genderChart = new google.visualization.PieChart(document.getElementById('genderChart'));
  google.visualization.events.addListener(genderChart, 'select', function() {
    var selection = genderChart.getSelection();
  });
  genderChart.draw(genderData, genderOptions);
  console.log("drawing gender chart, first time")
}

function getAnalytics() {
  // console.log("getAnalytics")
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

function drawAgeAndGenderBreakdownChart() {
  ageAndGenderData = new google.visualization.DataTable();
  ageAndGenderData.addColumn('string', 'age');
  ageAndGenderData.addColumn('number', 'Female');
  ageAndGenderData.addColumn('number', 'Male');

  for (i = 0; i < groups.length; i++) {
    ageAndGenderData.addRow([groups[i].minAge + " - " + groups[i].maxAge, -5, 5]);
  }
  ageAndGenderOptions = {
    isStacked: true,
    colors: colors,
    vAxis: {
      format: "##;##"
    },
    hAxis: {
      format: "##;##"
    },
    height:500,
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
  // var ageGroupSelection = ageAndGenderChart.getSelection();
  // console.log(ageGroupSelection[0]);
  // drawRaceChart(ageGroupSelection);
  google.visualization.events.addListener(ageAndGenderChart, 'select', function() {
    console.log("E",ageAndGenderChart.getSelection())
  });
}

function updateAgeAndGenderChart() {
  if (ageAndGenderData == null) {
    console.error('ageAndGenderData is null')
    return;
  }

  for (i = 0; i < groups.length; i++) {
    // console.error('UPDATING GROUP ' + i)
    ageAndGenderData.setValue(i, 1, getGenderStats('Male', groups[i].minAge, groups[i].maxAge));
    ageAndGenderData.setValue(i, 2, getGenderStats('Female', groups[i].minAge, groups[i].maxAge));
  }

  google.visualization.events.addListener(ageAndGenderChart, 'ready',function () {
    // console.log("chart updated")
  })

  ageAndGenderChart.draw(ageAndGenderData, ageAndGenderOptions)
}

google.load("visualization", "1", {packages:["corechart"]});
$(function() {
  google.setOnLoadCallback(drawGenderChart());
  google.setOnLoadCallback(drawAgeAndGenderBreakdownChart());
  google.setOnLoadCallback(drawRaceChart());
});