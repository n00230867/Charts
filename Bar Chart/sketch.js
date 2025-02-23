let data = [];
let cleanedData = [];
let charts = [];


function preload(){
    data = loadTable('data/Combined.csv', 'csv', 'header');
}

function setup() {
    createCanvas(600, 600);
    noLoop(); // this will stop the draw function from looping
    angleMode(DEGREES); // this will change the angle mode to degrees
    cleanData();
    charts.push(new BarChart({
        data: cleanedData,
        xValue: "Age_Group",
        yValue: "Female",
    }));
}

function draw(){
    background(0, 150, 150);
    charts.forEach(charts => {
        // charts.render();
        charts.renderChart();
        charts.renderTicks();
        charts.renderBars();
        charts.renderLabels();
        
    });
}

function cleanData(){
    for (let i = 0; i < data.rows.length; i++){
        cleanedData.push(data.rows[i].obj);  
        }
    for(let i=0; i<cleanedData.length; i++){
        cleanedData[i].Female = parseInt(cleanedData[i].Female);
        cleanedData[i].Male = parseInt(cleanedData[i].Male);
        cleanedData[i].Total = parseInt(cleanedData[i].Total);
    }

}