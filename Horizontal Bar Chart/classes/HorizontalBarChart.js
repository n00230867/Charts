class HorizontalBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue; // Categories (Y-Axis)
        this.yValue = obj.yValue; // Values (X-Axis)
        this.chartHeight = obj.chartHeight || 300;
        this.barWidth = obj.barWidth || 20;
        this.margin = obj.margin || 20; // Margin applied on all sides
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.chartPosX || 100;
        this.chartPosY = obj.chartPosY || 450;

        this.gap = (this.chartHeight - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.maxValue = max(this.data.map(row => row[this.yValue])) || 1; // Avoid division by zero

        this.numOfTicks = 5; // Number of ticks on X-axis
        this.tickSpacing = 50; // Fixed spacing between ticks
        this.chartWidth = this.numOfTicks * this.tickSpacing + this.margin; // Chart stops at last tick

        this.scaler = (this.numOfTicks * this.tickSpacing) / this.maxValue; // FIXED SCALING

        this.axisColour = color(0, 0, 0);
        this.barColour = color(0, 255, 150);
        this.axisTextColour = color(0, 0, 0);
    }

    renderChart() {
        background(200, 200, 200);

        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        
        // Draw Y-axis and X-axis
        line(this.margin, 0, this.margin, -this.chartHeight); // Y-axis
        line(this.margin, 0, this.chartWidth, 0);   // X-axis
        
        this.renderTicks();
        this.renderLabels();
        this.renderBars();  // Ensure bars are drawn
        
        pop();
    }

    renderTicks() {
        push();
        for (let i = 0; i <= this.numOfTicks; i++) {
            let x = this.margin + i * this.tickSpacing;

            stroke(this.axisColour);
            strokeWeight(1);
            line(x, 0, x, 5); // Small tick marks
        }
        pop();
    }

    renderBars() {
        push();
        for (let i = 0; i < this.data.length; i++) {
            let yPos = -((this.barWidth + this.gap) * i) - this.margin; // Corrected y-position
            let barLength = this.data[i][this.yValue] * this.scaler;
            
            fill(this.barColour);
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);
    
            rect(this.margin, yPos - this.barWidth / 2, barLength, this.barWidth); // Adjusted yPos
        }
        pop();
    }

    renderLabels() {
        push();
        fill(this.axisTextColour);
        noStroke();
        textSize(10);

        // X-Axis Tick Labels
        push();
        for (let i = 0; i <= this.numOfTicks; i++) {
            let x = this.margin + i * this.tickSpacing;
            let tickValue = (this.maxValue / this.numOfTicks) * i;
            textAlign(CENTER, TOP);
            text(round(tickValue), x, 8);
        }
        pop();

        // Y-Axis Category Labels (Bar Labels)
        push();
        for (let i = 0; i < this.data.length; i++) {
            let yPos = -((this.barWidth + this.gap) * i) - this.margin; // Apply top margin
            textAlign(RIGHT, CENTER);
            textSize(12);
            text(this.data[i][this.xValue], this.margin - 10, yPos - (this.barWidth / 2));
        }
        pop();
    }
}