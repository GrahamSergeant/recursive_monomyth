 google.charts.load('current', {packages:['wordtree']});
      google.charts.setOnLoadCallback(drawTree);

function drawTree(newData) {
        let data = google.visualization.arrayToDataTable(
          [ ['Phrases'],
            ['']
          ]
        );
        if (newData){
          data = google.visualization.arrayToDataTable(
          newData
        );
        }
        var options = {
          wordtree: {
            format: 'implicit',
            word: 'Your_StoryWorld',
            height: 1000,
            maxFontSize: 5
          }
        };
        var chart = new google.visualization.WordTree(document.getElementById('wordtree_basic'));
        chart.draw(data, options);
      }