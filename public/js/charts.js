<html>
  <head>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawAgeAndGenderBreakdownChart);
      google.setOnLoadCallback(drawGenderChart);
      /**
       * @brief Draws age and gender breakdown chart
       * @params: percentages by each age group for males and females
       * @return chart
       */
      function drawAgeAndGenderBreakdownChart(maleGroup1, femaleGroup1, maleGroup2, femaleGroup2, maleGroup3, femaleGroup3, maleGroup4, femaleGroup4, maleGroup5, femaleGroup5, maleGroup6, femaleGroup6, maleGroup7, femaleGroup7) {
        /* Create and populate the data table. */
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
        };

        /* Create and draw the visualization. */
        new google.visualization.ColumnChart(document.getElementById('visualization'))
          .draw(new google.visualization.DataTable(data), {
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
          
      /**
       * @brief Draws the pie chart by male/female breakdown
       * @param % of males
       * @param % of females
       * @return chart
       */
      function drawGenderChart(malePercentage, femalePercentage) {
        var data = google.visualization.arrayToDataTable([
          ['Gender', 'Percentage'],
          ['Male', malePercentage],
          ['Female', femalePercentage]
        ]);

        var options = {
          title: 'Gender Breakdown',
          pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
      }

    </script>
  </head>
  <body>
    <div id="piechart" style="width: 900px; height: 500px;"></div>
    <div id="donutchart" style="width: 900px; height: 500px;"></div>
  </body>
</html>