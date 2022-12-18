import { BaseCustomWebComponentConstructorAppend, css, html } from "@node-projects/base-custom-webcomponent";


export class DoubleGaugeComponent extends BaseCustomWebComponentConstructorAppend {

    static override readonly style = css``;

    static override readonly template = html`
        <div id="root" style="width: 100%; height: 100%">
            <svg viewBox="0 0 120 120" style="width: 100%; height: 100%">
                <g transform= "translate(10,10)">
                    <rect style="fill:#EEEEEE;stroke-width:0.3;stroke:#000000;stroke-opacity:1" id="rect3680" width="114" height="100" x="-7" y="0" />
                    <text x="40" y="95" style="font-family:Arial; font-size:4px" id="aggregated" class="aggregated">OEE</text>
                    <path style="fill:none;stroke:#AA0000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0,100 100,100" id="needle1" class="needle1" inkscape:connector-curvature="0" transform="rotate(-60,0,100)" /> 
                    <path style="fill:none;stroke:#AA0000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 95,100 100,100" inkscape:connector-curvature="0" transform="rotate(-30,0,100)" /> 
                    <path style="fill:none;stroke:#AA0000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 95,100 100,100" inkscape:connector-curvature="0" transform="rotate(-6,0,100)" />               
                    <path style="fill:none;stroke:#AA0000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 95,100 100,100" inkscape:connector-curvature="0" transform="rotate(-12,0,100)" /> 
                    <text x="100" y="101" transform="rotate(-12,0,100)" style="font-family:Arial; font-size:4px">20%</text> 
                    <path style="fill:none;stroke:#AA0000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 95,100 100,100" inkscape:connector-curvature="0" transform="rotate(-18,0,100)" /> 
                    <path style="fill:none;stroke:#AA0000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 95,100 100,100" inkscape:connector-curvature="0" transform="rotate(-24,0,100)" /> 
                    <text x="100" y="101" transform="rotate(-24,0,100)" style="font-family:Arial; font-size:4px">40%</text> 
                    <path style="fill:none;stroke:#AA0000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 95,100 100,100" inkscape:connector-curvature="0" transform="rotate(-36,0,100)" /> 
                    <text x="100" y="101" transform="rotate(-36,0,100)" style="font-family:Arial; font-size:4px">60%</text> 
                    <path style="fill:none;stroke:#AA0000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 95,100 100,100" inkscape:connector-curvature="0" transform="rotate(-42,0,100)" /> 
                    <path style="fill:none;stroke:#AA0000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 95,100 100,100" inkscape:connector-curvature="0" transform="rotate(-48,0,100)" /> 
                    <text x="100" y="101" transform="rotate(-48,0,100)" style="font-family:Arial; font-size:4px">80%</text> 
                    <path style="fill:none;stroke:#AA0000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 95,100 100,100" inkscape:connector-curvature="0" transform="rotate(-54,0,100)" /> 
                    <path style="fill:none;stroke:#AA0000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 95,100 100,100" inkscape:connector-curvature="0" transform="rotate(-60,0,100)" /> 
                    <text x="100" y="100" transform="rotate(-58,0,100)" style="font-family:Arial; font-size:4px">100%</text> 
                    <path style="fill:none;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 100,100 0,100" id="needle2" class="needle2" inkscape:connector-curvature="0" transform="rotate(60,100,100)" /> 
                    <path style="fill:none;stroke:#000000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0,100 5,100" inkscape:connector-curvature="0" transform="rotate(30,100,100)" /> 
                    <text x="-8" y="101" transform="rotate(36,100,100)" style="font-family:Arial; font-size:4px">60%</text> <text x="-8" y="101" transform="rotate(12,100,100)" style="font-family:Arial; font-size:4px">20%</text> 
                    <text x="-8" y="101" transform="rotate(24,100,100)" style="font-family:Arial; font-size:4px">40%</text> <text x="-8" y="101" transform="rotate(48,100,100)" style="font-family:Arial; font-size:4px">80%</text> 
                    <path style="fill:none;stroke:#000000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0,100 5,100" inkscape:connector-curvature="0" transform="rotate(60,100,100)" /> 
                    <text x="-10" y="100" transform="rotate(58,100,100)" style="font-family:Arial; font-size:4px">100%</text> 
                    <path style="fill:none;stroke:#000000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0,100 5,100" inkscape:connector-curvature="0" transform="rotate(6,100,100)" /> 
                    <path style="fill:none;stroke:#000000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0,100 5,100" inkscape:connector-curvature="0" transform="rotate(12,100,100)" /> 
                    <path style="fill:none;stroke:#000000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0,100 5,100" inkscape:connector-curvature="0" transform="rotate(18,100,100)" /> 
                    <path style="fill:none;stroke:#000000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0,100 5,100" inkscape:connector-curvature="0" transform="rotate(24,100,100)" /> 
                    <path style="fill:none;stroke:#000000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0,100 5,100" inkscape:connector-curvature="0" transform="rotate(36,100,100)" /> 
                    <path style="fill:none;stroke:#000000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0,100 5,100" inkscape:connector-curvature="0" transform="rotate(42,100,100)" /> 
                    <path style="fill:none;stroke:#000000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0,100 5,100" inkscape:connector-curvature="0" transform="rotate(48,100,100)" /> 
                    <path style="fill:none;stroke:#000000;stroke-width:0.4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0,100 5,100" inkscape:connector-curvature="0" transform="rotate(54,100,100)" /> 
                    <ellipse style="fill:#ff0000;stroke:#000000;stroke-width:0.1;stroke-opacity:1" id="path4493" cx="0" cy="100" rx="1.3" ry="1.3" /> 
                    <ellipse style="fill:#000000;stroke:#000000;stroke-width:0.1;stroke-opacity:1" id="path4495" cx="100" cy="100" rx="1.3" ry="1.3" /> 
                </g > 
            </svg >
        </div>`;

    static readonly is = "node-projects-double-gauge";

    static readonly properties = {
        leftValue: Number,
        rightValue: Number
    }

    private _needle1: SVGPathElement;
    private _needle2: SVGPathElement;
    private _aggregated: SVGTextElement;

    constructor() {
        super();
        this._restoreCachedInititalValues();
        this._needle1 = this._getDomElement<SVGPathElement>('needle1');
        this._needle2 = this._getDomElement<SVGPathElement>('needle2');
        this._aggregated = this._getDomElement<SVGTextElement>('aggregated');
    }

    ready() {
        this._parseAttributesToProperties();
        this.refresh();
    }

    private _leftValue: number = 0;
    get leftValue() { return this._leftValue; }
    set leftValue(value: number) { this._leftValue = value; this.refresh(); }

    private _rightValue: number = 0;
    get rightValue() { return this._rightValue; }
    set rightValue(value: number) { this._rightValue = value; this.refresh(); }

    refresh() {
        let rotation = this._leftValue / 100.0 * 60.0;
        this._needle1.setAttribute("transform", "rotate(-" + rotation + ",0,100)");
        rotation = this._rightValue / 100.0 * 60.0;
        this._needle2.setAttribute("transform", "rotate(" + rotation + ",100,100)");
        this._aggregated.innerHTML = "OEE " + Math.round(this._leftValue * this._rightValue / 100) + " %";
    }
}

customElements.define(DoubleGaugeComponent.is, DoubleGaugeComponent);