class StackedChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.yValueTotal = obj.yValueTotal;

        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 15;
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.chartPosX || 100;
        this.chartPosY = obj.chartPosY || 450;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.scaler = this.chartHeight / Math.max(...this.data.map(row => row[this.yValueTotal]));

        this.axisColour = color(0, 0, 0);
        this.barColour = color(0, 255, 150);
        this.axisTextColour = color(0, 0, 0);

        this.numOfTicks = 5;
        this.tickSpacing = this.chartHeight / this.numOfTicks;
        this.maxValue = Math.ceil(Math.max(...this.data.map(row => row[this.yValueTotal])));

        // Assigning colors for stacked bars
        this.barColours = [color(255, 0, 0), color(0, 0, 255)]; // Example colors for two yValues
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
            push();
            translate(xPos, 0);

            push();
            for (let j = 0; j < this.yValues.length; j++) {
                fill(this.barColours[j] || color(100)); // Default gray if no color is assigned
                noStroke();
                rect(0, 0, this.barWidth, -this.data[i][this.yValues[j]] * this.scaler);
                translate(0, -this.data[i][this.yValues[j]] * this.scaler - 1);
            }
            pop();
            pop();
        }
        pop();
    }

    renderTicks() {
        push();
        for (let i = 0; i <= this.numOfTicks; i++) {
            let y = -i * this.tickSpacing;
            line(-5, y, 0, y);
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
            translate(xPos + this.barWidth / 2, 0);
            rotate(60);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }
        pop();
    }
}
