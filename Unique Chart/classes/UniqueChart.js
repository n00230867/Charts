class UniqueChart {
    constructor(obj) {
        // Data
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.yValues = obj.yValues; // Array of Y-axis values (multiple lines)

        // Chart Dimensions
        this.chartHeight = obj.chartHeight || 350;
        this.chartWidth = obj.chartWidth || 550;
        this.margin = obj.margin || 0;
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.chartPosX || 155;
        this.chartPosY = obj.chartPosY || 500;

        // Colors
        this.axisColour = color(0);
        this.axisTextColour = color(0);

        // Fixed colors for each line
        this.fixedColors = [
            color(255, 0, 0),   // Red for Nintendo
            color(0, 0, 255),   // Blue for Sony
            color(0, 255, 0),   // Green for Microsoft
            color(255, 165, 0), // Orange for Ubisoft
            color(128, 0, 128)  // Purple for EA
        ];

        // Scaling
        this.gap = (this.chartWidth - (this.margin * 2)) / (this.data.length - 1);
        this.maxValue = Math.max(...this.yValues.flatMap(y => this.data.map(row => Number(row[y]) || 0)));
        this.scaler = this.chartHeight / this.maxValue;

        // Ticks
        this.numOfTicks = 5;
        this.tickSpacing = this.chartHeight / this.numOfTicks;
        this.tickColor = color(230, 230, 230);
    }

    renderChart() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);

        // Draw axes
        line(0, 0, 0, -this.chartHeight); // Y-axis
        line(0, 0, this.chartWidth, 0); // X-axis

        // Chart Title
        textSize(16);
        fill(0);
        noStroke();
        textAlign(CENTER);
        text("Multi-Line Chart For Publisher Sales", this.chartWidth / 2, -this.chartHeight - 30);
        pop();
    }

    renderLineChart() {
        push();
        translate(this.chartPosX + this.margin, this.chartPosY);

        for (let j = 0; j < this.yValues.length; j++) {
            let yKey = this.yValues[j];
            stroke(this.fixedColors[j]); // Use fixed color for the line
            strokeWeight(2);
            noFill();

            // Draw the line
            beginShape();
            for (let i = 0; i < this.data.length; i++) {
                let xPos = this.gap * i;
                let yPos = -this.data[i][yKey] * this.scaler;
                vertex(xPos, yPos);
            }
            endShape();

            // Draw points on the line
            fill(this.fixedColors[j]); // Use fixed color for the points
            for (let i = 0; i < this.data.length; i++) {
                let xPos = this.gap * i;
                let yPos = -this.data[i][yKey] * this.scaler;
                ellipse(xPos, yPos, 6, 6);
            }
        }
        pop();
    }

    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);

        // Y-Axis Ticks
        for (let i = 0; i <= this.numOfTicks; i++) {
            let y = -i * this.tickSpacing;
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);
            line(-5, y, 0, y); // Left ticks

            // Y-Axis Labels
            textSize(10);
            fill(this.axisTextColour);
            noStroke();
            textAlign(RIGHT, CENTER);
            let labelValue = (i * (this.maxValue / this.numOfTicks)).toFixed(1); // Scaled value
            text(labelValue, -10, y); // Display scaled value
        }

        // Y-Axis Guide Lines
        for (let i = 1; i <= this.numOfTicks; i++) {
            let y = -i * this.tickSpacing;
            stroke(this.tickColor);
            strokeWeight(this.axisThickness);
            line(this.chartWidth, y, this.axisThickness, y); // Horizontal guide lines
        }

        // X-Axis Ticks (Years)
        for (let i = 0; i < this.data.length; i++) {
            let xPos = this.gap * i;
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);
            line(xPos, 0, xPos, 5); // Bottom ticks

            // X-Axis Labels (Years)
            textSize(10);
            fill(this.axisTextColour);
            noStroke();
            textAlign(CENTER, TOP);
            text(this.data[i][this.xValue], xPos, 10); // Display year below the tick
        }

        // X-Axis Guide Lines
        for (let i = 1; i < this.data.length; i++) {
            let xPos = this.gap * i;
            stroke(this.tickColor);
            strokeWeight(this.axisThickness);
            line(xPos, -this.axisThickness, xPos, -this.chartHeight); // Vertical guide lines
        }

        pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);
        textSize(12);
        fill(this.axisTextColour);
        noStroke();

        // X-Axis Label
        textAlign(CENTER);
        text("Years", this.chartWidth / 2, 50);

        // Y-Axis Label
        push();
        translate(-80, -this.chartHeight / 2);
        rotate(0);
        text("Sales (Millions)", 0, 0);
        pop();
        pop();
    }

    renderLegend() {
        push();
        translate(this.chartPosX + this.chartWidth - 70, this.chartPosY - this.chartHeight - 100); // Adjust position
        textSize(12);
        fill(0);
        noStroke();
        textAlign(LEFT);

        for (let i = 0; i < this.yValues.length; i++) {
            fill(this.fixedColors[i]); // Use fixed color for the legend
            rect(0, i * 20, 10, 10);
            fill(0);
            text(this.yValues[i], 15, i * 20 + 10);
        }

        pop();
    }
}