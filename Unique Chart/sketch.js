let data;
let cleanedData = [];
let charts = [];

function preload() {
    data = loadTable('data/Combined.csv', 'csv', 'header');
}

function setup() {
    createCanvas(600, 600);
    noLoop();
    cleanData();
    
    charts.push(new UniqueChart({
        data: cleanedData,
        xValue: "Age_Group",
        yValues: ["Total", "Female"],  // Bars = "Total", Line = "Female"
    }));
}

function draw() {
    background(255);
    charts.forEach(chart => {
        chart.renderChart();
        chart.renderTicks();
        chart.renderBars();
        chart.renderLineChart();
        chart.renderLabels();
    });
}

function cleanData() {
    for (let i = 0; i < data.rows.length; i++) {
        cleanedData.push(data.rows[i].obj);
    }

    for (let i = 0; i < cleanedData.length; i++) {
        cleanedData[i].Female = parseInt(cleanedData[i].Female);
        cleanedData[i].Male = parseInt(cleanedData[i].Male);
        cleanedData[i].Total = parseInt(cleanedData[i].Total);
    }
}
