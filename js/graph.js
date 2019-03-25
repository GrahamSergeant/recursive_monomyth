google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

 function drawChart(newData) {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Challenges Done');
      data.addColumn('number', 'Stage');
      data.addColumn('number', 'Level');
      data.addColumn('number', 'Chapter');
      if (newData){
        data.addRows(newData);
      }
      var options = {
      hAxis: {
        title: 'Challenges Done'
              },
      legend: { position: 'bottom' },
      title: 'Recursive Monomyth Logging Graph',


      trendlines: {
      1: {
        type: 'linear',
        color: 'green',
        lineWidth: 3,
        opacity: 0.9,
        showR2: false,
        visibleInLegend: true,
        labelInLegend: 'Level Trendline'
          }
        },
      //colors: ['#e2431e', '#d3362d', '#e7711b'],
        series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {targetAxisIndex: 1, axis: 'stage', lineWidth: 6},
          1: {targetAxisIndex: 0, axis: 'level', lineWidth: 4},
          2: {targetAxisIndex: 1, axis: 'stage', lineWidth: 2}
        },
        vAxes: {
          // Adds labels to each axis; they don't have to match the axis names.
            0: {
              title: 'Level',
              gridlines:{ color: '#000'},
              ticks: [0,25,50,75,100,125,150]
                },
            1: {title: 'Stage / Chapter', ticks: [0,1,2,3,4,5,6,7,8,9,10,11]}
         }
       };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }
