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
        this.maxValue = max(this.data.map(row => row[this.yValue]));

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
        
        this.renderTicks(); // Call tick rendering function
        
        pop();
    }

    renderTicks() {
        // X-Axis Ticks
        for (let i = 0; i <= this.numOfTicks; i++) {
            let x = this.margin + i * this.tickSpacing;
            let tickValue = (this.maxValue / this.numOfTicks) * i;

            stroke(this.axisColour);
            strokeWeight(1);
            line(x, 0, x, 5); // Small tick lines

            noStroke();
            fill(this.axisTextColour);
            textSize(10);
            textAlign(CENTER, TOP);
            text(round(tickValue), x, 8); // Tick labels
        }
    }

    renderBars() {
        this.renderChart(); // Ensure chart is drawn before bars

        push();
        translate(this.chartPosX, this.chartPosY);

        for (let i = 0; i < this.data.length; i++) {
            let yPos = -((this.barWidth + this.gap) * i) - this.margin; // Apply top margin
            fill(this.barColour);
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);

            // Bars extend along X with left margin applied
            rect(this.margin, yPos, this.data[i][this.yValue] * this.scaler, -this.barWidth);
    
            // Y-axis Labels
            fill(this.axisTextColour);
            noStroke();
            textSize(12);
            textAlign(RIGHT, CENTER);
            text(this.data[i][this.xValue], this.margin - 10, yPos - (this.barWidth / 2));
        }
        pop();
    }
}
