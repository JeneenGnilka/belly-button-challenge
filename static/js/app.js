// JSON url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Promist pending for JSON data request from URL
const dataPromise = d3.json(url);
    console.log("Data Promist: ", dataPromise);

// request JSON data
d3.json(url).then(function(data) {
    console.log(data);
});

// Initialize dashboard
function init() {

    // select the dropdown menu using d3
    let dropdownMenu = d3.select("#selDataset");

    // get sample names for drop-down selector
    d3.json(url).then((data) => {
        // variable for smaple names
        let names = data.names;

        // add sample to dropdown
        names.forEach((id) => {
            // log id value and iteration of loop
            console.log(id);

            dropdownMenu.append("option").text(id).property("value", id);
        });
    // set the first sample from list
    let sample_one = names[0];

    // log value of sample_one
    console.log(sample_one);

    // build the initial plots
    buildMetadata(sample_one);
    buildBarChart(sample_one);
    buildBubbleChart(sample_one);
    buildGaugeChart(sample_one);
    });
};

// function - metadata information
function buildMetadata(sample) {

    // use d3 to retrieve data
    d3.json(url).then((data) => {
        // get metadata
        let metadata = data.metadata;
        //filter using value of the sample
        let value = metadata.filter(result => result.id == sample);
        //log array of metadata objects after filtering
        console.log(value);
        //get first index from array
        let valueData = value[0];
        //clear out metadata
        d3.select("#sample-metadata").html("");
        //add each key/value pair to panel
        Object.entries(valueData).forEach(([key,value]) =>{
            //log individual key/value pairs
            d3.select("#sample-metadata").append("h5").text(`${key}:${value}`);
        });
    });
};

// function - bar chart
function buildBarChart(sample) {
    // use d3 to retrieve data
    d3.json(url).then((data) => {
        //get sample data
        let sampleInfo = data.samples;
        //filter using value of the sample
        let value = sampleInfo.filter(result => result.id == sample);
        //get first index from array
        let valueData = value[0];
        //get the otu_ids, labels, and sample vaules
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;
        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        //get top 10 items - descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        //trace for bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };
        // Setup the layout
        let layout = {
            title: "Top 10 OTUs Present"
        };
        // call Plotly
        Plotly.newPlot("bar",[trace], layout)
    });
};

// Function that builds the bubble chart
function buildBubbleChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        // get sample data
        let sampleInfo = data.samples;
        //filter using value of the sample
        let value = sampleInfo.filter(result => result.id == sample);
        //get first index from array
        let valueData = value[0];
        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;
        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        // Set up the trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Function to update dashboard when sample changes
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

// Call the initialize function
init();