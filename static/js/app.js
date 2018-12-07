function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var url = `/metadata/${sample}`
  
  // Use d3 to select the panel with id of `#sample-metadata`
  var metaData = d3.select('#sample-metadata')
  // Use `.html("") to clear any existing metadata
  metaData.html("").append('ul');

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(response) {
    var data = [response];
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

      for (key in data[0]) {
        metaData.append('li').text(`${key} : ${data[0][key]}`)

        };
      }); 
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

  };



function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  var url = `/samples/${sample}`;
  d3.json(url).then(function(data) {
    var layout = {
      title: `Sample ${sample}`,
      showlegend: true,
      height: 600,

    };

    trace1 = {type: 'pie',
        values: data.sample_values.slice(0, 10),
        labels: data.otu_ids.slice(0, 10),
        hovertext: data.otu_labels.slice(0, 10),
      }
    Plotly.newPlot("pie", [trace1], layout);




    var layout2 = {
      title: "",
      showlegend: false,
      height: 600,
      width: 1200
    };

    trace2 = {
        y: data.sample_values,
        x: data.otu_ids,
        text: data.otu_labels,
        mode: 'markers',
        marker: {
          size: data.sample_values,
          color: data.otu_ids
        }
    }
  
    Plotly.newPlot("bubble", [trace2], layout2);
      });


  var url = `/wfreq/${sample}`;
  d3.json(url).then(function(data) {
      
    // Enter a speed between 0 and 180
    var level = data;

    // Trig to calc meter point
    var degrees = 180-(level*18),
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);
    var trace3 = [{ type: 'scatter',
    x: [0], y:[0],
     marker: {size: 28, color:'850000'},
     showlegend: false,
     name: 'speed',
     text: level,
     hoverinfo: 'none'},
   { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50, ],
   rotation: 90,
   text: ['9+', '8', '7', '6',
             '5', '4','3','2','1', ''],
   textinfo: 'text',
   textposition:'inside',
   marker: {colors:[
    '#F8F2EC','#F4F0E4','#E9E4C9',
    '#E5E6B2','#D4E29C','#B3CA91',
   '#84BD88','#82B98E','#7DB289',
    '#FFFFFF']},
   hoverinfo: 'none',
   hole: .5,
   type: 'pie',
   showlegend: false
 }];
 
      var layout3 = {
        title: "washes per week",
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
              color: '850000'
            }
          }],
        title: 'Washes per Week',
        height: 700,
        width: 700,
        xaxis: {zeroline:false, showticklabels:false,
                  showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                  showgrid: false, range: [-1, 1]}
      };
      
      Plotly.newPlot('gauge', trace3, layout3);
    });
  };
  


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  console.log(` Option Changed: ${newSample}`);
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};

// Initialize the dashboard
init();
