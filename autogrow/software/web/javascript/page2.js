google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['heures', 'humiditée', 'humiditée idéale'],
          ['15h20',  45,      65],
          ['15h25',  48,      65],
          ['15h30',  59,       65],
          ['15h35',  58,      65],
          ['15h40', 67,       65],
          ['15h45',62,        65],
          
        ]);

        var options = {
          title: 'humiditée de la plante',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }
