google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['heures', 'temperature', 'temperature idéale'],
          ['15h20',  35,      35],
          ['15h25',  38,      35],
          ['15h30',  40,       35],
          ['15h35',  37,      35],
          ['15h40', 34,35],
          ['15h45',27,35],
          
        ]);

        var options = {
          title: 'températures de la plante',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }
