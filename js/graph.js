google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

 function drawChart(newData) {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'challenges');
      data.addColumn('number', 'Level');
      data.addColumn('number', 'Stage');
      data.addColumn('number', 'Chapter');
      if (newData){
        data.addRows(newData);
      }
      var options = {
      legend: { position: 'top' },
      title: 'Progress Graph',
      
      
      trendlines: {
      0: {
        type: 'linear',
        color: '#6B8E23',
        lineWidth: 30,
        opacity: 0.3,
        showR2: false,
        visibleInLegend: true,
        labelInLegend: 'Level Trendline'
          }
        },
      colors: ['#6B8E23', '#FF4500', '#00BFFF'],
        series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {targetAxisIndex: 0, axis: 'level', lineWidth: 6},
          1: {targetAxisIndex: 1, axis: 'chapter', lineWidth: 5},
          2: {targetAxisIndex: 2, axis: 'stage', lineWidth: 4}
        },
        vAxis: {format:'#', minValue:1, direction:1, baseline:0},
        hAxis: {format:'#', minValue:1, direction:1, baseline:0, title: 'Challenges Done'},
        vAxes: {
          // Adds labels to each axis; they don't have to match the axis names.
            0: {
              title: 'Level',
              gridlines:{ color: '#6B8E23'},
              minorGridlines: {color: '#6B8E23'},
              //ticks: [0,10,20,30, 100]
                },
            2: {title: 'Chapter / Stage',
              ticks: [
              {v:0, f:'Ordinary World'},
              {v:1, f:'Calling'},
              {v:2, f:'Refusal'},
              {v:3, f:'Mentor'},
              {v:4, f:'Threshold'},
              {v:5, f:'Tests'},
              {v:6, f:'Approach'},
              {v:7, f:'Ordeal'},
              {v:8, f:'Reward'},
              {v:9, f:'Homebound'},
              {v:10, f:'Ressurection'},
              {v:11, f:'Elixir'}]},

            1: {
              title: '',
              textStyle: {color: 'white'},
              ticks: [0,1,2,3,4,5,6,7,8,9,10,11]}
         }
       };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }
      