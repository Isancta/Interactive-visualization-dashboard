function buildMetadata(sample) {

// @TODO: Complete the following function that builds the metadata panel

// Use `d3.json` to fetch the metadata for a sample
	var url = `/sample/${sample}`;
	
	const dataPromise = d3.json(url);
	console.log("Data Promise:",datapromise);
	
// Use d3 to select the panel with id of `#sample-metadata`
	
	var data = d3.select ("#sample-metadata")

// Use `.html("") to clear any existing metadata ???????

// Use `Object.entries` to add each key and value pair to the panel
	
	sample.forEach(function(SampleValues) {
	console.log(SampleValues)
	Object.entries(SampleValues).forEach(function([key, value]) {
	console.log(key, value);
	
// Hint: Inside the loop, you will need to use d3 to append new
// tags for each key-value in the metadata.?????

// BONUS: Build the Gauge Chart
// buildGauge(data.WFREQ);
}

function buildCharts(sample) {

// @TODO: Use `d3.json` to fetch the sample data for the plots

	data = d3.json(`${data}`).then(function(response){
	console.log(response);		
	});

// @TODO: Build a Bubble Chart using the sample data
	
	var otus_ids = data.otus_ids  
 
	otus_ids = otus_ids.slice(0,10);
	var samples_values = 
	samples_values = samples_values.slice (0,10);
	var otus_labels = 
	otus_labels = otus_labels.slice (0,10);
	
	var Defaul_trace1 = {
						x: data.otus_ids,
						y: data.samples_values,
						mode: "markers",
						type: "scatter",
						text: data.otus_labels
						marker: {
								size:data.sample_values,
								color:data.otus_ids,
	
								symbol: "cross"
								}
						};

	var layout = {
				title: "Belly Button Biodiversity",
				xaxis: { title: "Otus_ids" },
				yaxis: { title: "SampleValues" }
  
		Plotly.newPlot("plot", data, layout);

// @TODO: Build a Pie Chart
	
	var otus_ids = 
	otus_ids = otus_ids.slice(0, 10);
	var sample_values =
	sample_values = sample_values.slice(0, 10);
	var otus_labels = 
	otus_labels = otus_labels.slice(0, 10);
		var Defaul_trace2 = {
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

	

   

    


// HINT: You will need to use slice() to grab the top 10 sample_values,
// otu_ids, and labels (10 each).


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
