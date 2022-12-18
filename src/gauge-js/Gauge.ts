import { AnimationUpdater } from "./AnimationUpdater.js";
import { BaseGauge } from "./BaseGauge.js";
import { GaugePointer } from "./GaugePointer.js";
import { cutHex, formatNumber } from "./Helpers.js";
import { Options } from "./Options.js";

export class Gauge extends BaseGauge {
    elem: any = null
    maxValue: number = 80;
	displayedAngle: number = 0;
	lineWidth: number = 40;
    paddingTop: number = 0.1;
    paddingBottom: number = 0.1;
    percentColors: any = null;
    extraPadding: number;
    availableHeight: number;
    radius: number;

	static initClass() {
		
	}

	constructor(canvas: HTMLCanvasElement) {
		super();

		this.options = <Required<Options>> {
			colorStart: "#6fadcf",
			colorStop: undefined,
			gradientType: 0,       	// 0 : radial, 1 : linear
			strokeColor: "#e0e0e0",
			pointer: {
				length: 0.8,
				strokeWidth: 0.035,
				iconScale: 1.0
			},
			angle: 0.15,
			lineWidth: 0.44,
			radiusScale: 1.0,
			fontSize: 40,
			limitMax: false,
			limitMin: false
		};
		
		this.canvas = canvas;
		this.percentColors = null;
		this.ctx = this.canvas.getContext('2d');
		// Set canvas size to parent size
		const h = this.canvas.clientHeight;
		const w = this.canvas.clientWidth;
		this.canvas.height = h;
		this.canvas.width = w;

		this.gp = [new GaugePointer(this)];
		this.setOptions();
	}

	override setOptions(options = null) {
		super.setOptions(options);
		this.configPercentColors();
		this.extraPadding = 0;
		if (this.options.angle < 0) {
			const phi = Math.PI * (1 + this.options.angle);
			this.extraPadding = Math.sin(phi);
		}
		this.availableHeight = this.canvas.height * (1 - this.paddingTop - this.paddingBottom);
		this.lineWidth = this.availableHeight * this.options.lineWidth; // .2 - .7
		this.radius = (this.availableHeight - (this.lineWidth / 2)) / (1.0 + this.extraPadding);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		for (let gauge of Array.from(this.gp)) {
			gauge.setOptions(this.options.pointer);
			gauge.render();
		}
		this.render();
		return this;
	}

	//@ts-ignore
	configPercentColors() {
		this.percentColors = null;
		if (this.options.percentColors !== undefined) {
			this.percentColors = new Array();
			return (() => {
				const result = [];
				for (let i = 0, end = this.options.percentColors.length - 1, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
					const rval = parseInt((cutHex(this.options.percentColors[i][1])).substring(0, 2), 16);
					const gval = parseInt((cutHex(this.options.percentColors[i][1])).substring(2, 4), 16);
					const bval = parseInt((cutHex(this.options.percentColors[i][1])).substring(4, 6), 16);
					result.push(this.percentColors[i] = { pct: this.options.percentColors[i][0], color: { r: rval, g: gval, b: bval } });
				}
				return result;
			})();
		}
	}

	set(value: { [x: string]: any; length?: any; }) {
		let gp: GaugePointer, i: number;
		let asc: boolean, end: number;
		if (!(value instanceof Array)) {
			value = [value];
		}
		// Ensure values are OK
		for (i = 0, end = value.length - 1, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
			value[i] = this.parseValue(value[i]);
		}

		// check if we have enough GaugePointers initialized
		// lazy initialization
		if (value.length > this.gp.length) {
			let asc1: boolean, end1: number;
			for (i = 0, end1 = value.length - this.gp.length, asc1 = 0 <= end1; asc1 ? i < end1 : i > end1; asc1 ? i++ : i--) {
				gp = new GaugePointer(this);
				gp.setOptions(this.options.pointer);
				this.gp.push(gp);
			}
		} else if (value.length < this.gp.length) {
			// Delete redundant GaugePointers
			this.gp = this.gp.slice(this.gp.length - value.length);
		}

		// get max value and update pointer(s)
		i = 0;

		//@ts-ignore
		for (let val of Array.from(value)) {
			// Limit pointer within min and max?
			if (val > this.maxValue) {
				if (this.options.limitMax) {
					val = this.maxValue;
				} else {
					this.maxValue = val + 1;
				}

			} else if (val < this.minValue) {
				if (this.options.limitMin) {
					val = this.minValue;
				} else {
					this.minValue = val - 1;
				}
			}

			this.gp[i].value = val;
			this.gp[i++].setOptions( { minValue: this.minValue, maxValue: this.maxValue, angle: this.options.angle } );
		}
		this.value = Math.max(Math.min(value[value.length - 1], this.maxValue), this.minValue); // TODO: Span maybe??

		// Force first .set()
		AnimationUpdater.add(this);
		AnimationUpdater.run(this.forceUpdate);
		return this.forceUpdate = false;
	}

	getAngle(value: number) {
		return ((1 + this.options.angle) * Math.PI) + (((value - this.minValue) / (this.maxValue - this.minValue)) * (1 - (this.options.angle * 2)) * Math.PI);
	}

	getColorForPercentage(pct: number, grad: boolean) {
		let color: { r: any; g: any; b: any; };
		if (pct === 0) {
			({
                color
            } = this.percentColors[0]);
		} else {
			({
                color
            } = this.percentColors[this.percentColors.length - 1]);
			for (let i = 0, end = this.percentColors.length - 1, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
				if (pct <= this.percentColors[i].pct) {
					if (grad === true) {
						// Gradually change between colors
						const startColor = this.percentColors[i - 1] || this.percentColors[0];
						const endColor = this.percentColors[i];
						const rangePct = (pct - startColor.pct) / (endColor.pct - startColor.pct);  // How far between both colors
						color = {
							r: Math.floor((startColor.color.r * (1 - rangePct)) + (endColor.color.r * rangePct)),
							g: Math.floor((startColor.color.g * (1 - rangePct)) + (endColor.color.g * rangePct)),
							b: Math.floor((startColor.color.b * (1 - rangePct)) + (endColor.color.b * rangePct))
						};
					} else {
						({
                            color
                        } = this.percentColors[i]);
					}
					break;
				}
			}
		}
		return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
	}

	getColorForValue(val: number, grad: any) {
		const pct = (val - this.minValue) / (this.maxValue - this.minValue);
		return this.getColorForPercentage(pct, grad);
	}

	renderStaticLabels(staticLabels: { font: string; color: string; labels: any; fractionDigits: unknown; }, w: number, h: number, radius: number) {
		this.ctx.save();
		this.ctx.translate(w, h);

		// Scale font size the hard way - assuming size comes first.
		let font = staticLabels.font || "10px Times";
		const re = /\d+\.?\d?/;
		let match = font.match(re)[0];
		let rest = font.slice(match.length);
		let fontsize = parseFloat(match) * this.displayScale;
		this.ctx.font = fontsize + rest;
		this.ctx.fillStyle = staticLabels.color || "#000000";

		this.ctx.textBaseline = "bottom";
		this.ctx.textAlign = "center";
		for (let value of Array.from(staticLabels.labels)) {
			var rotationAngle: number;
			//@ts-ignore
			if (value.label !== undefined) {
				// Draw labels depending on limitMin/Max
				if ((!this.options.limitMin || (value >= this.minValue)) && (!this.options.limitMax || (value <= this.maxValue))) {
					//@ts-ignore
					font = value.font || staticLabels.font;
					match = font.match(re)[0];
					rest = font.slice(match.length);
					fontsize = parseFloat(match) * this.displayScale;
					this.ctx.font = fontsize + rest;
									
					//@ts-ignore
					rotationAngle = this.getAngle(value.label) - ((3 * Math.PI) / 2);
					this.ctx.rotate(rotationAngle);
					//@ts-ignore
					this.ctx.fillText(formatNumber(value.label, staticLabels.fractionDigits), 0, -radius - (this.lineWidth / 2));
					this.ctx.rotate(-rotationAngle);
				}

			} else {
				// Draw labels depending on limitMin/Max
				if ((!this.options.limitMin || (value >= this.minValue)) && (!this.options.limitMax || (value <= this.maxValue))) {
					//@ts-ignore
					rotationAngle = this.getAngle(value) - ((3 * Math.PI) / 2);
					this.ctx.rotate(rotationAngle);
					this.ctx.fillText(formatNumber(value, staticLabels.fractionDigits), 0, -radius - (this.lineWidth / 2));
					this.ctx.rotate(-rotationAngle);
				}
			}
		}
			
		return this.ctx.restore();
	}

	//@ts-ignore
	renderTicks(ticksOptions: { divisions?: any; subDivisions?: any; divColor?: any; subColor?: any; divLength?: any; subLength?: any; divWidth?: any; subWidth?: any; }, w: number, h: number, radius: number) {
		//@ts-ignore
		if (ticksOptions !== {}) {
			const divisionCount = ticksOptions.divisions || 0;
			const subdivisionCount = ticksOptions.subDivisions || 0;
			const divColor = ticksOptions.divColor || '#fff';
			const subColor = ticksOptions.subColor || '#fff';
			const divLength = ticksOptions.divLength || 0.7; // default
			const subLength = ticksOptions.subLength || 0.2; // default
			//@ts-ignore
			const range = parseFloat(this.maxValue) - parseFloat(this.minValue); // total value range
			//@ts-ignore
			const rangeDivisions = parseFloat(range) / parseFloat(ticksOptions.divisions); // get division step
			//@ts-ignore
			const subDivisions = parseFloat(rangeDivisions) / parseFloat(ticksOptions.subDivisions);
			//@ts-ignore
			let currentDivision = parseFloat(this.minValue);
			let currentSubDivision = 0.0 + subDivisions;
			const lineWidth = range / 400; // base
			const divWidth = lineWidth * (ticksOptions.divWidth || 1);
			const subWidth = lineWidth * (ticksOptions.subWidth || 1);

			return (() => {
				const result = [];
				for (let t = 0, end = divisionCount + 1; t < end; t++) {
					this.ctx.lineWidth = this.lineWidth * divLength;
					var scaleMutate = (this.lineWidth / 2) * ( 1 - divLength);
					var tmpRadius = (this.radius * this.options.radiusScale) + scaleMutate;
				
					this.ctx.strokeStyle = divColor;
					this.ctx.beginPath();
					this.ctx.arc(0, 0, tmpRadius, this.getAngle(currentDivision - divWidth), this.getAngle(currentDivision + divWidth), false);
					this.ctx.stroke();

					currentSubDivision = currentDivision + subDivisions;
					currentDivision += rangeDivisions;
					if ((t !== ticksOptions.divisions) && (subdivisionCount > 0)) { // if its not the last marker then draw subs
						result.push((() => {
							const result1 = [];
							for (let st = 0, end1 = subdivisionCount - 1; st < end1; st++) {
								this.ctx.lineWidth = this.lineWidth * subLength;
								scaleMutate = (this.lineWidth / 2) * ( 1 - subLength);
								tmpRadius = (this.radius * this.options.radiusScale) + scaleMutate;
						
								this.ctx.strokeStyle = subColor;
								this.ctx.beginPath();
								this.ctx.arc(0, 0, tmpRadius, this.getAngle(currentSubDivision - subWidth), this.getAngle(currentSubDivision + subWidth), false);
								this.ctx.stroke();
								result1.push(currentSubDivision += subDivisions);
							}
							return result1;
						})());
					} else {
						result.push(undefined);
					}
				}
				return result;
			})();
		}
	}

			//@ctx.restore()

	render() {
		// Draw using canvas
		const w = this.canvas.width / 2;
		const h = ((this.canvas.height * this.paddingTop) + this.availableHeight) - ((this.radius + (this.lineWidth / 2)) * this.extraPadding);
		const displayedAngle = this.getAngle(this.displayedValue);
		if (this.textField) {
			this.textField.render(this);
		}

		this.ctx.lineCap = "butt";
		const radius = this.radius * this.options.radiusScale;
		//@ts-ignore
		if (this.options.staticLabels) {
			//@ts-ignore
			this.renderStaticLabels(this.options.staticLabels, w, h, radius);
		}
		
		//@ts-ignore
		if (this.options.staticZones) {
			this.ctx.save();
			this.ctx.translate(w, h);
			this.ctx.lineWidth = this.lineWidth;
			//@ts-ignore
			for (let zone of Array.from(this.options.staticZones)) {
				// Draw zones depending on limitMin/Max
				let {
					//@ts-ignore
                    min
                } = zone;
				if (this.options.limitMin && (min < this.minValue)) {
					min = this.minValue;
				}
				let {
					//@ts-ignore
                    max
                } = zone;
				if (this.options.limitMax && (max > this.maxValue)) {
					max = this.maxValue;
				}
				let tmpRadius = (this.radius * this.options.radiusScale);
				//@ts-ignore
				if (zone.height) {
					//@ts-ignore
					this.ctx.lineWidth = this.lineWidth * zone.height;
					//@ts-ignore
					const scaleMutate = (this.lineWidth / 2) * (zone.offset || (1 - zone.height));
					tmpRadius = (this.radius * this.options.radiusScale) + scaleMutate;
				}
				
				//@ts-ignore
				this.ctx.strokeStyle = zone.strokeStyle;
				this.ctx.beginPath();
				this.ctx.arc(0, 0, tmpRadius, this.getAngle(min), this.getAngle(max), false);
				this.ctx.stroke();
			}

		} else {
			let fillStyle: string;
			//@ts-ignore
			if (this.options.customFillStyle !== undefined) {
				//@ts-ignore
				fillStyle = this.options.customFillStyle(this);
			} else if (this.percentColors !== null) {
				//@ts-ignore
				fillStyle = this.getColorForValue(this.displayedValue, this.options.generateGradient);
			} else if (this.options.colorStop !== undefined) {
				if (this.options.gradientType === 0) {
					fillStyle = this.ctx.createRadialGradient(w, h, 9, w, h, 70);
				} else {
					fillStyle = this.ctx.createLinearGradient(0, 0, w, 0);
				}
				//@ts-ignore
				fillStyle.addColorStop(0, this.options.colorStart);
				//@ts-ignore
				fillStyle.addColorStop(1, this.options.colorStop);
			} else {
				fillStyle = this.options.colorStart;
			}
			this.ctx.strokeStyle = fillStyle;

			this.ctx.beginPath();
			this.ctx.arc(w, h, radius, (1 + this.options.angle) * Math.PI, displayedAngle, false);
			this.ctx.lineWidth = this.lineWidth;
			this.ctx.stroke();

			this.ctx.strokeStyle = this.options.strokeColor;
			this.ctx.beginPath();
			this.ctx.arc(w, h, radius, displayedAngle, (2 - this.options.angle) * Math.PI, false);
			this.ctx.stroke();
			this.ctx.save();
			this.ctx.translate(w, h);
		}
		//@ts-ignore
		if (this.options.renderTicks) {//@ts-ignore
			this.renderTicks(this.options.renderTicks, w, h, radius);
		}

		
		this.ctx.restore();
		// Draw pointers from (w, h)

		this.ctx.translate(w, h);
		for (let gauge of Array.from(this.gp)) {
			gauge.update(true);
		}
		return this.ctx.translate(-w, -h);
	}
}