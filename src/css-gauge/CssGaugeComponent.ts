import { BaseCustomWebComponentConstructorAppend, css, html } from "@node-projects/base-custom-webcomponent";

export class CssGaugeComponent extends BaseCustomWebComponentConstructorAppend {

    static override readonly style = css`
        .gauge {
            position: relative;
            background: var(--gauge-bg);
            border: 0.05em solid #222222;
            border-radius: 50%;
            font-weight: bold;
            font-size: 34px;
        }
        
        .gauge .ticks {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0%;
            left: 0%;
        }
        
        .gauge .ticks .min {
            background: black;
            position: relative;
            left: 0%;
            top: 50%;
            width: 100%;
            height: 1%;
            margin-bottom: -1%;
            background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0%, rgba(0, 0, 0, 0) 4%, rgba(0, 0, 0, 1) 4%, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 0) 15%);
            transform: rotate(-45deg);
        }
        
        .gauge .ticks .mid {
            background: black;
            position: relative;
            left: 0%;
            top: 50%;
            width: 100%;
            height: 1%;
            margin-bottom: -1%;
            background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0%, rgba(0, 0, 0, 0) 4%, rgba(0, 0, 0, 1) 4%, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 0) 15%);
            transform: rotate(90deg);
        }
        
        .gauge .ticks .max {
            background: black;
            position: relative;
            left: 0%;
            top: 50%;
            width: 100%;
            height: 1%;
            margin-bottom: -1%;
            background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0%, rgba(0, 0, 0, 0) 4%, rgba(0, 0, 0, 1) 4%, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 0) 15%);
            transform: rotate(225deg);
        }
        
        .gauge .ticks .tithe {
            transform: rotate(calc(27deg * var(--gauge-tithe-tick) - 45deg));
            background: black;
            position: relative;
            left: 0%;
            top: 50%;
            width: 100%;
            height: 1%;
            margin-bottom: -1%;
            background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0%, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 0) 15%);
        }
        
        .gauge .tick-circle {
            position: absolute;
            top: 15%;
            left: 15%;
            width: calc(70% - 0.1em);
            height: calc(70% - 0.1em);
            border-left: 0.1em solid;
            border-top: 0.1em solid;
            border-right: 0.1em solid;
            border-bottom: 0.1em solid transparent;
            border-radius: 50%;
        }
        
        .gauge .needle {
            /* Gauge value range 0-100 */
            transform: rotate(calc(270deg * calc(var(--gauge-value, 0deg) / 100) - 45deg));
            background: black;
            position: relative;
            left: 0%;
            top: 49%;
            width: 100%;
            height: 4%;
            margin-bottom: -4%;
            background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0%, rgba(0, 0, 0, 0) 24%, rgba(0, 0, 0, 1) 24%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 50%);
        }
        
        .gauge .needle .needle-head {
            position: relative;
            top: 15%;
            left: 22.5%;
            width: 2.7%;
            height: 70%;
            background-color: black;
            transform: rotate(-45deg);
        }
        
        .gauge .labels {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        
        .gauge .labels .value-label {
            position: relative;
            top: 75%;
            display: flex;
            justify-content: center;
        }
        
        .gauge .labels .value-label::after {
            counter-reset: gauge-value var(--gauge-display-value);
            content: counter(gauge-value);
        }
        
        .guide-x, .guide-y {
            background-color: orange;
            visibility: visible;
            position: absolute;
            left: 50%;
            top: 0;
            width: 1px;
            height: 100%;
        }
        
        .guide-y {
            left: 0;
            top: 50%;
            width: 100%;
            height: 1px;
        }`;

    static readonly styleGlossy = css`
        .gauge-glossy {
            border: outset 4px #036564;
            background: rgb(64, 244, 118);
            background: linear-gradient(5deg, #033649, #036564);
            text-shadow: 2px 2px 5px #0d3b3e;
        }
        
        .gauge-glossy .gauge {
            opacity: 0.9;
            border-color: #023332;
            background: linear-gradient(-155deg, #036564, #033649);
            color: rgb(46, 121, 114);
        }
        
        .gauge-glossy p, .gauge-glossy h1 {
            font-size: 20px;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            font-weight: 700;
            position: relative;
            color: #12937b;
        }
        
        .gauge-glossy h1 {
            font-size: 30px;
        }
        
        .gauge-glossy .gauge .labels .value-label {
            color: white;
        }
        
        .gauge-glossy .gauge .needle {
            background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0%, rgba(0, 0, 0, 0) 24%, rgba(255, 127, 80, 1) 24%, rgba(255, 127, 80, 1) 30%, rgba(0, 0, 0, 0) 50%);
        }
        
        .gauge-glossy .gauge .needle .needle-head {
            background-color: rgb(255, 127, 80);
        }
        
        .gauge-glossy .gauge .ticks::before {
            position: absolute;
            top: 4px;
            bottom: 8px;
            left: 4px;
            right: 8px;
            background: linear-gradient(174deg, rgba(255, 0, 0, 0), rgba(255, 0, 0, 0), rgba(255, 0, 0, 0), rgba(255, 255, 255, .2));
            content: '';
            border-radius: 50%;
        }
        
        .gauge-glossy .gauge .ticks::after {
            position: absolute;
            top: 2px;
            bottom: 2px;
            left: 2px;
            right: 2px;
            background: linear-gradient(-40deg, rgba(255, 0, 0, 0), rgba(255, 0, 0, 0), rgba(255, 0, 0, 0), rgba(255, 0, 0, 0), rgba(255, 255, 255, .9));
            content: '';
            border-radius: 50%;
            z-index: 2;
        }`;

    static override readonly template = html`
        <div class="gauge gauge-glossy" style="width:100%; height:100%;">
            <div class="ticks">
                <div class="tithe" style="--gauge-tithe-tick:1;"></div>
                <div class="tithe" style="--gauge-tithe-tick:2;"></div>
                <div class="tithe" style="--gauge-tithe-tick:3;"></div>
                <div class="tithe" style="--gauge-tithe-tick:4;"></div>
                <div class="tithe" style="--gauge-tithe-tick:6;"></div>
                <div class="tithe" style="--gauge-tithe-tick:7;"></div>
                <div class="tithe" style="--gauge-tithe-tick:8;"></div>
                <div class="tithe" style="--gauge-tithe-tick:9;"></div>
                <div class="min"></div>
                <div class="mid"></div>
                <div class="max"></div>
            </div>
            <div class="tick-circle"></div>
            <div class="needle">
                <div class="needle-head"></div>
            </div>
            <div class="labels">
                <div class="value-label"></div>
            </div>
        </div>`;

    static readonly is = "node-projects-css-gauge";

    static readonly properties = {
        type: ['', 'glossy'],
        value: Number,
        displayValue: Number
    }

    private _type: '' | 'glossy' = '';
    get type() { return this._type; }
    set type(value: '' | 'glossy') { this._type = value; this._type == '' ? this.shadowRoot.adoptedStyleSheets = [CssGaugeComponent.style] : this.shadowRoot.adoptedStyleSheets = [CssGaugeComponent.style, CssGaugeComponent.styleGlossy] }

    private _value: number = 0;
    get value() { return this._value; }
    set value(value: number) { this._value = value; this.style.setProperty('--gauge-value', value.toString()); }

    private _displayValue: number = 0;
    get displayValue() { return this._displayValue; }
    set displayValue(value: number) { this._displayValue = value; this.style.setProperty('--gauge-display-value', value.toString()); }

    constructor() {
        super();
        this._restoreCachedInititalValues();
    }

    ready() {
        this._parseAttributesToProperties();
    }
}

customElements.define(CssGaugeComponent.is, CssGaugeComponent);
declare global {
    interface HTMLElementTagNameMap {
        'node-projects-css-gauge': CssGaugeComponent;
    }
}