 google.charts.load('current', {packages:['wordtree']});
      google.charts.setOnLoadCallback(drawTree);

function drawTree(newData) {
        let data = google.visualization.arrayToDataTable(
          [ ['Phrases'],
            ['Storyworld L0 S0 C0']
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
            word: 'storyworld'
          }
        };
        var chart = new google.visualization.WordTree(document.getElementById('wordtree_basic'));
        chart.draw(data, options);
      }