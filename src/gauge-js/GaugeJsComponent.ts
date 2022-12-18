import { BaseCustomWebComponentConstructorAppend, css, html } from "@node-projects/base-custom-webcomponent";
import { Gauge } from "./Gauge.js";

export class GaugeComponent extends BaseCustomWebComponentConstructorAppend {

    static override readonly style = css`
        canvas {
            width: 100%;
            height: 100%;
        }`;

    static override readonly template = html`<canvas id="canvas"></canvas>`;

    static readonly is = "node-projects-gauge-js";

    private _canvas: HTMLCanvasElement;
    private _gauge: Gauge;

    constructor() {
        super();
        this._restoreCachedInititalValues();
        this._canvas = this._getDomElement<HTMLCanvasElement>('canvas');
    }

    ready() {
        this._parseAttributesToProperties();

       let opts = {
            angle: -0.25,
            lineWidth: 0.2,
            radiusScale:0.9,
            pointer: {
              length: 0.6,
              strokeWidth: 0.05,
              color: '#000000'
            },
            staticLabels: {
              font: "10px sans-serif",
              labels: [200, 500, 2100, 2800],
              fractionDigits: 0
            },
            staticZones: [
               {strokeStyle: "#F03E3E", min: 0, max: 200},
               {strokeStyle: "#FFDD00", min: 200, max: 500},
               {strokeStyle: "#30B32D", min: 500, max: 2100},
               {strokeStyle: "#FFDD00", min: 2100, max: 2800},
               {strokeStyle: "#F03E3E", min: 2800, max: 3000}
            ],
            limitMax: false,
            limitMin: false,
            highDpiSupport: true
          };
        this._gauge = new Gauge(this._canvas).setOptions(opts); // create sexy gauge!
        this._gauge.maxValue = 3000; // set max gauge value
        this._gauge.setMinValue(0);  // set min value
    }
}

customElements.define(GaugeComponent.is, GaugeComponent);