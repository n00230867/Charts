let data;
let cleanedData = [];
let charts = [];

function preload() {
    data = loadTable('data/Game_Data.csv', 'csv', 'header');
}

function setup() {
    createCanvas(800, 600);
    noLoop();
    cleanData();
    
    charts.push(new UniqueChart({
        data: cleanedData,
        xValue: "Year",  // X-axis remains the year
        yValue: "Total_Sales",
        yValues: ["Nintendo", "Sony", "Microsoft", "Ubisoft", "EA"], // Include all publishers
    }));
    
}

function draw() {
    background(255);
    charts.forEach(chart => {
        chart.renderChart();
        chart.renderTicks();
        chart.renderLineChart()
        chart.renderLabels();
        chart.renderLegend();
    });
}

function cleanData(){
    for(let i=0; i<data.rows.length; i++ ){
        cleanedData.push(data.rows[i].obj)
    }

    for(let i=0; i<cleanedData.length; i++ ){
        cleanedData[i].Game = parseInt(cleanedData[i].Game)
        cleanedData[i].Publisher = parseInt(cleanedData[i].Publisher)
        cleanedData[i].Year = parseInt(cleanedData[i].Year)
        cleanedData[i].Total_Sales = parseInt(cleanedData[i].Total_Sales)
    }
}