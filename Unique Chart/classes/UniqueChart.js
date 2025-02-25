class UniqueChart {
    constructor(obj) {
        // Data
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues; // Array for multiple values

        // Chart Dimensions
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 15;
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.chartPosX || 100;
        this.chartPosY = obj.chartPosY || 450;

        // Colors
        this.axisColour = color(0);
        this.barColour = color(0, 255, 150, 180); // Semi-transparent green
        this.lineColour = color(255, 0, 0); // Red line
        this.pointColour = color(0, 0, 255); // Blue points
        this.axisTextColour = color(0);
        this.tickColor = color(155, 155, 155);

        // Scaling
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.maxValue = Math.max(...this.yValues.flatMap(y => this.data.map(row => Number(row[y]) || 0)));
        this.scaler = this.chartHeight / this.maxValue;

        // Ticks
        this.numOfTicks = 5;
        this.tickSpacing = this.chartHeight / this.numOfTicks;
    }

    renderChart() {
        background(220);
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
            let barHeight = -this.data[i][this.yValues[0]] * this.scaler; // Use first Y value for bars
            fill(this.barColour);
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);
            rect(xPos, 0, this.barWidth, barHeight);
        }
        pop();
    }

    renderLineChart() {
        push();
        translate(this.margin, 0);
        stroke(this.lineColour);
        strokeWeight(2);
        noFill();

        beginShape();
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i + this.barWidth / 2;
            let yPos = -this.data[i][this.yValues[1]] * this.scaler; // Use second Y value for line
            vertex(xPos, yPos);
        }
        endShape();

        // Draw points on the line
        fill(this.pointColour);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i + this.barWidth / 2;
            let yPos = -this.data[i][this.yValues[1]] * this.scaler;
            ellipse(xPos, yPos, 6, 6);
        }
        pop();
    }

    renderTicks() {
        push();
        for (let i = 0; i <= this.numOfTicks; i++) {
            let y = -i * this.tickSpacing;
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);
            line(-5, y, 0, y);
        }
        for (let i = 1; i <= this.numOfTicks; i++) {
            let y = -i * this.tickSpacing;
            push();
            stroke(this.tickColor);
            line(2, y, this.chartWidth, y);
            pop();
        }
        pop();
    }

    renderLabels() {
        push();
        textSize(10);
        fill(this.axisTextColour);
        noStroke();

        // Y-Axis Labels
        for (let i = 0; i <= this.numOfTicks; i++) {
            let y = -i * this.tickSpacing;
            text(i * this.maxValue / this.numOfTicks, -40, y);
        }

        // X-Axis Labels
        translate(this.margin, 10);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            push();
            translate(xPos + (this.barWidth / 2), 0);
            rotate(45);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }

        pop();
    }
}
