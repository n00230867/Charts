class BarChart {
    constructor(obj){
        //Data
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;

        //Chart
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 15;
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.chartPosX || 100;
        this.chartPosY = obj.chartPosY || 450;
        
        this.axisColour = color(0,0,0);
        this.barColour = color(0,255,150);
        this.axisTextColour = color(0,0,0);

        //Calculations
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.scaler = this.chartHeight / (max(cleanedData.map(row => row[this.yValue])));

        //Ticks
        this.numOfTicks = 5;
        this.tickWidth = obj.tickWidth || 300;
        this.tickColor = color(155,155,155);
        this.tickSpacing = this.chartHeight / this.numOfTicks;
        this.maxValue = Math.ceil(Math.max(...this.data.map(row => row[this.yValue])));
    }

    renderChart() {
        background(200, 200, 200);
        translate(this.chartPosX, this.chartPosY);
        noFill();
        
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        
        line(0, 0, 0, -this.chartHeight); // Y-axis
        line(0, 0, this.chartWidth, 0); // X-axis
    }

    renderBars() {
        push();
        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            fill(this.barColour);
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);
            rect(xPos, 0, this.barWidth, -this.data[i][this.yValue] * this.scaler);
        }
        pop();
    }

    renderTicks() {
        push();
        for (let i = 0; i <= this.numOfTicks; i++) {
            let y = -i * this.tickSpacing;
    
            // Draw small black ticks on the Y-axis
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);
            line(-5, y, 0, y);
        }
        for (let i = 1; i <= this.numOfTicks; i++) {
            let y = -i * this.tickSpacing;
    
            // Draw long grid lines
            push();
            stroke(this.tickColor);
            line(2, y, this.tickWidth, y);
            pop();
        }
        pop();
    }
    

    renderLabels() {
        push();
        textSize(10);
        fill(this.axisTextColour);
        noStroke();

        // Tick Labels (Y-Axis)
        for (let i = 0; i <= this.numOfTicks; i++) {
            let y = -i * this.tickSpacing;
            text(i * this.maxValue / this.numOfTicks, -40, y);
        }

        // Bar Labels (X-Axis)
        translate(this.margin, 10);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            push();
            translate(xPos + (this.barWidth / 2), 0);
            rotate(90);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }
        pop();
    }
}
