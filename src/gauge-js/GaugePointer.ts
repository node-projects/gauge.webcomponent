import { Gauge } from "./Gauge.js";
import { Options } from "./Options.js";
import { ValueUpdater } from "./ValueUpdater.js";

export class GaugePointer extends ValueUpdater {
	options: Required<Options> = <Required<Options>>{
		strokeWidth: 0.035,
		length: 0.1,
		color: "#000000",
		iconScale: 1.0,
		iconAngle: 0
	};
	img: any;
	gauge: Gauge;
	length: number;
	strokeWidth: number;
	maxValue: any;
	minValue: any;
	
	constructor(gauge: Gauge) {
		super();
		this.gauge = gauge;
		if (this.gauge === undefined) {
			throw new Error('The element isn\'t defined.');
		}
		this.ctx = this.gauge.ctx;
		this.canvas = this.gauge.canvas;
		this.setOptions();
	}

	//@ts-ignore
	setOptions(options?: Options) {
		this.options = { ...this.options, ...options };
		this.length = 2 * this.gauge.radius * this.gauge.options.radiusScale * this.options.length;
		this.strokeWidth = this.canvas.height * this.options.strokeWidth;
		this.maxValue = this.gauge.maxValue;
		this.minValue = this.gauge.minValue;
		this.animationSpeed = this.gauge.animationSpeed;
		this.options.angle = this.gauge.options.angle;
		if (this.options.iconPath) {
			this.img = new Image();
			return this.img.src = this.options.iconPath;
		}
	}

	render() {
		const angle = this.gauge.getAngle.call(this, this.displayedValue);

		const x = Math.round(this.length * Math.cos(angle));
		const y = Math.round(this.length * Math.sin(angle));

		const startX = Math.round(this.strokeWidth * Math.cos(angle - (Math.PI / 2)));
		const startY = Math.round(this.strokeWidth * Math.sin(angle - (Math.PI / 2)));

		const endX = Math.round(this.strokeWidth * Math.cos(angle + (Math.PI / 2)));
		const endY = Math.round(this.strokeWidth * Math.sin(angle + (Math.PI / 2)));

		this.ctx.beginPath();
		this.ctx.fillStyle = this.options.color;
		this.ctx.arc(0, 0, this.strokeWidth, 0, Math.PI * 2, false);
		this.ctx.fill();

		this.ctx.beginPath();
		this.ctx.moveTo(startX, startY);
		this.ctx.lineTo(x, y);
		this.ctx.lineTo(endX, endY);
		this.ctx.fill();

		if (this.img) {
			const imgX = Math.round(this.img.width * this.options.iconScale);
			const imgY = Math.round(this.img.height * this.options.iconScale);
			this.ctx.save();
			this.ctx.translate(x, y);
			this.ctx.rotate(angle + ((Math.PI / 180.0) * (90 + this.options.iconAngle)));
			this.ctx.drawImage(this.img, -imgX / 2, -imgY / 2, imgX, imgY);
			return this.ctx.restore();
		}
	}
}