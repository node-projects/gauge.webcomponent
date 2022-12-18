import { BaseDonut } from "./BaseDonut.js";
import { Options } from "./Options.js";

export class Donut extends BaseDonut {
    private _orginalStrokeColor: string;

    strokeGradient(w: number, h: number, start: number, stop: any) {
        const grd = this.ctx.createRadialGradient(w, h, start, w, h, stop);
        grd.addColorStop(0, this.options.shadowColor);
        grd.addColorStop(0.12, this._orginalStrokeColor);
        grd.addColorStop(0.88, this._orginalStrokeColor);
        grd.addColorStop(1, this.options.shadowColor);
        return grd;
    }

    override setOptions(options?: Options) {
        super.setOptions(options);
        const w = this.canvas.width / 2;
        const h = this.canvas.height / 2;
        const start = this.radius - (this.lineWidth / 2);
        const stop = this.radius + (this.lineWidth / 2);
        this._orginalStrokeColor = this.options.strokeColor;
        this.options.strokeColor = this.strokeGradient(w, h, start, stop);
        return this;
    }
}