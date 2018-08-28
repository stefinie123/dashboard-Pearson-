//Initializing properties for google charts
google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    //Initializing the colunm names of the array to set to the google charts data table
    var dataArray = [['Time','Online', 'Offline']];
    //getting data from the lambda function
    let infoJson = 'https://8z1v6z3ti0.execute-api.us-east-2.amazonaws.com/dev';
    fetch(infoJson).then(response => {
            return response.json();
    }).then(json => {
        console.log(json);
        //Iterating through the json file to retrieve data
            for(var i =0; i<json.length; i++){
                //Populating array with data from the json file.
                dataArray.push([json[i].date_time,json[i].servers_online,json[i].servers_offline]);
            }
            //Setting array to DataTable of the google chart
            var data = google.visualization.arrayToDataTable(dataArray);

            //Setting options/properties of the google chart
            var options = {
                title: 'Instance Utilization',
                hAxis: {
                    title: 'Time'
                },
                vAxis: {
                    title: 'Number of servers'
                },
                explorer: { actions: ['dragToZoom', 'rightClickToReset'] },
                legend: { position: 'bottom' }
            };

            //Initializing chart to and specifying the html tag to display the chart
            var chart =new google.charts.Line(document.getElementById('curve_chart'));

            //calling method to draw the chart
            chart.draw(data, google.charts.Line.convertOptions(options));
    });


}