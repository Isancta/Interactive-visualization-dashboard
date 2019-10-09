function buildMetadata(sample) {

  
	var url = `/metadata/${sample}`;
	d3.json (url).then(function(sample){
	console.log(sample);		
	});
  
  
    // Use d3 to select the panel with id of `#sample-metadata`
	
	var data = d3.select ("#sample-metadata")

    // Use `.html("") to clear any existing metadata ?????

    // Use `Object.entries` to add each key and value pair to the panel
	
	sample.forEach(function(SampleValues) {
	console.log(SampleValues)
	Object.entries(SampleValues).forEach(function([key, value]) {
	console.log(key, value);
	
    // Hint: Inside the loop, you will need to use d3 to append new ??????
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
	
	
	
	
	
	
//const dataPromide = d3.json(url);
//console.log("Data Promise:", dataPromise);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
	data = d3.json(`${sample}`).then(function(response){
	console.log(response);		
	});

  // @TODO: Build a Pie Chart using the sample data
	
	data = data.slice(0, 10);
	var otus_ids = 
	var sample_values = 
	var otus_labels = 
	
		var trace1 = {
				labels: [otus_ids],
				values: [sample_values],
				type: 'pie'
				text:otus_labels
};

	var data = [trace1];

	var layout = {
	title: "'Pie' Chart",
};

	Plotly.newPlot("plot", data, layout);

	// Build a bubble Chart using the sample data

    var data = [response];

    var layout = {
      title: "Pet Pals",
      xaxis: {
        title: "Pet Type"
      },
      yaxis: {
        title: "Number of Pals"
      }
    };

    Plotly.newPlot("plot", data, layout);
  });
}

buildPlot();


    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
//}

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
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
