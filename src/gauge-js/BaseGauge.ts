import { GaugePointer } from "./GaugePointer.js";
import { Options } from "./Options.js";
import { TextRenderer } from "./TextRenderer.js";
import { ValueUpdater } from "./ValueUpdater.js";

export abstract class BaseGauge extends ValueUpdater {
    displayScale: number | null = 1;
    forceUpdate: boolean = true;
    textField: TextRenderer;
    minValue: number;
    gp: GaugePointer[];
    options:  Required<Options>;

    setTextField(textField: any, fractionDigits: any) {
        return this.textField = textField instanceof TextRenderer ? textField : new TextRenderer(textField, fractionDigits);
    }

    setMinValue(minValue: any, updateStartValue?: boolean) {
        this.minValue = minValue;
        if (updateStartValue == null) { updateStartValue = true; }
        if (updateStartValue) {
            this.displayedValue = this.minValue;
            return Array.from(this.gp || []).map((gauge: { displayedValue: any; }) => (gauge.displayedValue = this.minValue));
        }
    }

    setOptions(options?:Options) {
        this.options = { ...this.options, ...options };
        if (this.textField) {
            this.textField.el.style.fontSize = this.options.fontSize + 'px';
        }

        if (this.options.angle > .5) {
            this.options.angle = .5;
        }
        this.configDisplayScale();
        return this;
    }

    configDisplayScale() {
        const prevDisplayScale = this.displayScale;

        if (this.options.highDpiSupport === false) {
            this.displayScale = null;
        } else {
            const devicePixelRatio = window.devicePixelRatio || 1;
            const backingStorePixelRatio =
                this.ctx.webkitBackingStorePixelRatio ||
                this.ctx.mozBackingStorePixelRatio ||
                this.ctx.msBackingStorePixelRatio ||
                this.ctx.oBackingStorePixelRatio ||
                this.ctx.backingStorePixelRatio || 1;
            this.displayScale = devicePixelRatio / backingStorePixelRatio;
        }

        if (this.displayScale !== prevDisplayScale) {
            const width = this.canvas.G__width || this.canvas.width;
            const height = this.canvas.G__height || this.canvas.height;
            if (this.displayScale != null) {
                this.canvas.width = width * this.displayScale;
                this.canvas.height = height * this.displayScale;
            }
            this.canvas.style.width = `${width}px`;
            this.canvas.style.height = `${height}px`;
            this.canvas.G__width = width;
            this.canvas.G__height = height;
        }

        return this;
    }

    parseValue(value: any) {
        value = parseFloat(value) || Number(value);
        if (isFinite(value)) { return value; } else { return 0; }
    }
}