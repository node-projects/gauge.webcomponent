import { AnimationUpdater } from "./AnimationUpdater.js";
import { BaseGauge } from "./BaseGauge.js";
import { Options } from "./Options.js";

export class BaseDonut extends BaseGauge {
    lineWidth: number = 15;
    maxValue: number;
    radius: number;

    constructor(canvas: any) {
        super(false, false);
        this.value = 33;
        this.maxValue = 80;
        this.minValue = 6;
        this.options = <Required<Options>>{
            lineWidth: 0.10,
            colorStart: "#6f6ea0",
            colorStop: "#c0c0db",
            strokeColor: "#eeeeee",
            shadowColor: "#d5d5d5",
            angle: 0.35,
            radiusScale: 1.0
        }

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.setOptions();
        this.render();
    }

    getAngle(value: number) {
        return ((1 - this.options.angle) * Math.PI) + (((value - this.minValue) / (this.maxValue - this.minValue)) * ((2 + this.options.angle) - (1 - this.options.angle)) * Math.PI);
    }

    override setOptions(options?: Options) {
        super.setOptions(options);
        this.lineWidth = this.canvas.height * this.options.lineWidth;
        this.radius = this.options.radiusScale * ((this.canvas.height / 2) - (this.lineWidth / 2));
        return this;
    }

    set(value: any) {
        this.value = this.parseValue(value);
        if (this.value > this.maxValue) {
            if (this.options.limitMax) {
                this.value = this.maxValue;
            } else {
                this.maxValue = this.value;
            }
        } else if (this.value < this.minValue) {
            if (this.options.limitMin) {
                this.value = this.minValue;
            } else {
                this.minValue = this.value;
            }
        }

        AnimationUpdater.add(this);
        AnimationUpdater.run(this.forceUpdate);
        return this.forceUpdate = false;
    }

    render() {
        const displayedAngle = this.getAngle(this.displayedValue);
        const w = this.canvas.width / 2;
        const h = this.canvas.height / 2;

        if (this.textField) {
            this.textField.render(this);
        }

        const grdFill = this.ctx.createRadialGradient(w, h, 39, w, h, 70);
        grdFill.addColorStop(0, this.options.colorStart);
        grdFill.addColorStop(1, this.options.colorStop);

        const start = this.radius - (this.lineWidth / 2);
        const stop = this.radius + (this.lineWidth / 2);

        this.ctx.strokeStyle = this.options.strokeColor;
        this.ctx.beginPath();
        this.ctx.arc(w, h, this.radius, (1 - this.options.angle) * Math.PI, (2 + this.options.angle) * Math.PI, false);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = "round";
        this.ctx.stroke();

        this.ctx.strokeStyle = grdFill;
        this.ctx.beginPath();
        this.ctx.arc(w, h, this.radius, (1 - this.options.angle) * Math.PI, displayedAngle, false);
        return this.ctx.stroke();
    }
}