function buildMetadata(sample) {

// @TODO: Complete the following function that builds the metadata panel

// Use `d3.json` to fetch the metadata for a sample
	var url = `/metadata/${sample}`;
	
	data = d3.json(url).then(function(response){
	console.log(response);		
	});
	
// Use d3 to select the panel with id of `#sample-metadata`
	
	var panel = d3.select ("#sample-metadata");

// Use `.html("") to clear any existing metadata ???????

	panel.html("");
 
// Use `Object.entries` to add each key and value pair to the panel
	
	
	Object.entries(data).forEach(function([key, value]) {
		
	console.log(`${key}: ${value}`);
	panel.append([key, value]); 
	});
	
// Hint: Inside the loop, you will need to use d3 to append new
// tags for each key-value in the metadata.?????

// BONUS: Build the Gauge Chart
// buildGauge(data.WFREQ);
};

function buildCharts(sample) {

// @TODO: Use `d3.json` to fetch the sample data for the plots
	var url = `/samples/${sample}`;
	d3.json(url).then(function(data) {
	console.log(data);
	
	const otus_ids = data.otu_ids;
	//otus_ids = otus_ids.slice(0,10);
	
	const sample_values = data.sample_values;
	//sample_values = sample_values.slice(0,10);
	
	const otus_labels = data.otu_labels;
	//otus_labels = otus_labels.slice(0,10);
	
	var Defaul_trace1 = [{
						x: otus_ids,
						y: sample_values,
						mode: "markers",
						type: "scatter",
						text: otus_labels,
						marker: {
								size:sample_values,
								color:otus_ids,
								symbol: "cross"
								}
						}];
	

	var layout = {
				title: "Belly Button Biodiversity",
				xaxis: { title: "Otus_ids" },
				yaxis: { title: "SampleValues" }
				};
  
		Plotly.plot("bubble",Defaul_trace1 , layout);

// @TODO: Build a Pie Chart
	
	
	var Defaul_trace2 = [{
				labels: otus_ids,
				values: sample_values,
				type: 'pie',
				text: otus_labels
		}];

	

	var layout2 = {
	title: "Pie Chart"
		};

	Plotly.plot("pie",Defaul_trace2 , layout2);	
	
	});
}

// @TODO: Build a Bubble Chart using the sample data
	
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
	console.log(`loading sample ${firstSample}`);
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
console.log("started");
init();
