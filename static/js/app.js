const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const optionChanged = choice =>
  d3.json(url).then(({ metadata, samples }) => {

    let meta = metadata.find(obj => obj.id == choice);
    let samp = samples.find(obj => obj.id == choice);

    d3.select('.panel-body').html('');
    Object.entries(meta).forEach(([key, val]) => {
      d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}: ${val}`);
    });

    let { otu_ids, sample_values, otu_labels } = samp;

    // Bar Chart
    let data = [{
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).reverse().map(x => `OTU ${x}`),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];

    Plotly.newPlot("bar", data);

    // Bubble Chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels.toString(),
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values,
        colorscale: "Earth"
      }
    };

    data = [trace1];

    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 600
    };

    Plotly.newPlot('bubble', data);

// Guage Chart
    data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: meta.wfreq,
        title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week</b>" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 400 },
        gauge: { axis: { range: [null, 9] } }
      }
    ];
    
    var layout = { width: 600, height: 400 };
    Plotly.newPlot('gauge', data, layout);


  });


d3.json(url).then(({ names }) => {

  names.forEach(id => {
    d3.select('select').append('option').text(id);
  });

  let sel = d3.select('select').node().value;

  optionChanged(sel);
});