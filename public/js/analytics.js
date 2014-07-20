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

/**
 * Create and populate the data table.
 * Males are above the x-axis.
 * Females are below the x-axis.
 */ 
function drawAgeAndGenderBreakdownChart(maleGroup1, femaleGroup1, maleGroup2, femaleGroup2, maleGroup3, femaleGroup3, maleGroup4, femaleGroup4, maleGroup5, femaleGroup5, maleGroup6, femaleGroup6, maleGroup7, femaleGroup7) {
  var data = {
    "cols":[
      {"id":"Age","label":"Age","type":"string"},
      {"id":"Female","label":"Female","type":"number"},
      {"id":"Male","label":"Male","type":"number"}
    ],"rows":[
      {
        "c":[
          {"v":13,"f":"13-17"},
          {"v":-1 * femaleGroup1,"f": femaleGroup1 +"%"},
          {"v":maleGroup1,"f": maleGroup1 + "%"}]
      },
      {
        "c":[
          {"v":18,"f":"18-24"},
          {"v":-1 * femaleGroup2,"f": femaleGroup2 + "%"},
          {"v":maleGroup2,"f": maleGroup2 + "%"}]
      },
      {
        "c":[
          {"v":25,"f":"25-34"},
          {"v":-1 * femaleGroup3,"f": femaleGroup3 + "%"},
          {"v":maleGroup3,"f": maleGroup3 + "%"}]
      },
      {
        "c":[
          {"v":35,"f":"35-44"},
          {"v":-1 * femaleGroup4,"f": femaleGroup4 + "%"},
          {"v":maleGroup4,"f": maleGroup4 + "%"}]
      },
      {
        "c":[
          {"v":45,"f":"45-54"},
          {"v":-1 * femaleGroup5,"f": femaleGroup5 + "%"},
          {"v":maleGroup5,"f": maleGroup5 + "%"}]
      },
      {
        "c":[
          {"v":55,"f":"55-64"},
          {"v":-1 * femaleGroup6,"f": femaleGroup6 + "%"},
          {"v":maleGroup6,"f": maleGroup6 + "%"}]
      },
      {
        "c":[
          {"v":64,"f":"64+"},
          {"v":-1 * femaleGroup7,"f": femaleGroup7 + "%"},
          {"v":maleGroup7,"f": maleGroup7 + "%"}]
      }
    ]
  }
    /* Create and draw the visualization. */
    var chart = new google.visualization.ColumnChart(document.getElementById('visualization'));
      chart.draw(new google.visualization.DataTable(data), {
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
  };

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
    width: 400,
    height: 240,
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
        google.visualization.events.addListener(chart, 'ready',function () {
          console.log("chart updated")
        })
  chart.draw(data, options);
  console.log("updating chart")
}

google.load("visualization", "1", {packages:["corechart"]});
$(function() {
  google.setOnLoadCallback(drawGenderChart(15,10));
});