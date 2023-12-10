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
    buildGaugeChart(sample_one);
    });
};

// function - guage chart
function buildGaugeChart(sample) {
    // get metadata
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
        // key/value pair
        let washFrequency = Object.values(valueData)[6];
        // set up trace for gauge
        let trace2 = {
            value: washFrequency,
            domain: {x: [0,1], y: [0,1]},
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {color: "black", size: 16}
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
                bar: {color: "black"},
                steps: [
                    {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                    {range: [1, 2], color: "rgba(235, 255, 238, .75)"},
                    {range: [2, 3], color: "rgba(203, 232, 211, .75)"},
                    {range: [3, 4], color:  "rgba(160, 207, 173, .75)"},
                    {range: [4, 5], color:  "rgba(139, 186, 152, .75)"},
                    {range: [5, 6], color: "rgba(101, 161, 118, .75)"},
                    {range: [6, 7], color: "rgba(93, 150, 109, .75)"},
                    {range: [7, 8], color:  "rgba(59, 129, 79, .75)"},
                    {range: [8, 9], color: "rgba(50, 102, 68, 0.75)"},
                    {range: [9, 10], color: "rgba(24, 63, 35, .75)"},
                ]
            }
        };

        // layout for guage
        let layout = {
            width: 400, 
            height: 400,
            margin: {t: 0, b:0}
        };

        // call Plotly
        Plotly.newPlot("gauge", [trace2], layout)
    });
};

// call initialize function
init();