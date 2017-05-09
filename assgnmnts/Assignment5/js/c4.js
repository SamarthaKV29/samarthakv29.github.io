

var z_data2=[];
Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv', function(err, rows){
function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}


var z_data= [];
for(i=0;i<24;i++)
{
  z_data.push(unpack(rows,i));
  z_data2.push(unpack(rows,i));
}

var data = [{
           z: z_data,
           type: 'surface',
					 colorscale: [
						 ['0.0', 'rgb(165,0,38)'],
						 ['0.11', 'rgb(215,48,39)'],
						 ['0.22', 'rgb(244,109,67)'],
						 ['0.33', 'rgb(253,174,97)'],
						 ['0.44', 'rgb(254,224,144)'],
						 ['0.55', 'rgb(224,243,248)'],
						 ['0.66', 'rgb(171,217,233)'],
						 ['0.77', 'rgb(116,173,209)'],
						 ['0.88', 'rgb(69,117,180)'],
						 ['1.0', 'rgb(49,54,149)']
					 ]
        }];

var layout = {
  title: 'Surface',
  autosize: true,
  width: 600,
  height: 600,
  margin: {
    l: 65,
    r: 50,
    b: 65,
    t: 90,
  }
};
Plotly.newPlot('myDiv', data, layout);
vol = computeVolume();
$("#vol").text(String(vol));
});

console.log(z_data2);
function computeVolume(){
  var volume = 0;
  var x = 24, y = 24;
  for(i = 0; i< x; i++){
    for(j = 0; j< y; j++){
      volume += (x * z_data2[i][j]) + (y * z_data2[i][j]);
    }

  }
  return parseInt(volume);
}
