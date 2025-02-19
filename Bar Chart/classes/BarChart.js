class BarChart {
    constructor(obj){
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 15;
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.chartPosX || 100;
        this.chartPosY = obj.chartPosY || 450;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length-1);
        this.scaler = this.chartHeight/(max(cleanedData.map(row => row[this.yValue])));

        this.axisColour = color(0,0,0);
        this.barColour = color(0,255,150);
        this.axisTextColour = color(0,0,0);

        this.numOfTicks = 5;
        this.tickSpacing = this.chartHeight / this.numOfTicks;

        this.maxValue = 0;
    }

    renderChart(){
        // CHART
        background(200, 200, 200);

        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);
    }

    renderBars(){
        // BARS
        push();
        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            fill(this.barColour);
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);
            rect(xPos, 0, this.barWidth, - this.data[i][this.yValue] * this.scaler);

            
            fill(this.axisTextColour);
            noStroke();
            textSize(10);
            push();
                translate(xPos + (this.barWidth / 2), 10);
                rotate(90);
                text(this.data[i][this.xValue], 0, 0);
            pop();
        } 
        pop();
        pop();
    }
    

    renderTicks() {
        // Calculate the maximum value before rendering ticks
        this.maxValue = Math.max.apply(Math, this.data.map(row => row[this.yValue]));
        this.maxValue = Math.ceil((this.maxValue*10)/10);
    
        push();
        for (let i = 0; i <= this.numOfTicks; i++) {
            let y = -i * this.tickSpacing;
            line(-5, y, 0, y);

            //im trying to separate this because if i dont then i wont be able to do no stroke and text size. Need to make the ticks in the same thing as the chart/axis
            push();
            text(i * this.maxValue / this.numOfTicks, -40, y);
            pop();
        }
        pop();
    }
}
