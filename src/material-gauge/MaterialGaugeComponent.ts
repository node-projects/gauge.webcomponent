import { BaseCustomWebComponentConstructorAppend, css, html } from "@node-projects/base-custom-webcomponent";

export class MaterialGaugeComponent extends BaseCustomWebComponentConstructorAppend {

    static override readonly style = css`
        .gauge {
            position: relative;
        }
        
        .gauge__container {
            margin: 0;
            padding: 0;
            position: absolute;
            left: 50%;
            overflow: hidden;
            text-align: center;
            transform: translateX(-50%);
        }
        
        .gauge__background {
            z-index: 0;
            position: absolute;
            background-color: #C5CAE9;
            top: 0;
            border-radius: 300px 300px 0 0;
        }
        
        .gauge__data {
            z-index: 1;
            position: absolute;
            background-color: #3F51B5;
            margin-left: auto;
            margin-right: auto;
            border-radius: 300px 300px 0 0;
            transform-origin: center bottom;
        }
        
        .gauge__center {
            z-index: 2;
            position: absolute;
            background-color: #fff;
            margin-right: auto;
            border-radius: 300px 300px 0 0;
        }
        
        .gauge__marker {
            z-index: 3;
            background-color: #fff;
            position: absolute;
            width: 1px;
        }
        
        .gauge__needle {
            z-index: 4;
            background-color: #E91E63;
            height: 3px;
            position: absolute;
            transform-origin: left center;
        }
        
        .gauge__labels {
            display: table;
            margin: 0 auto;
            position: relative;
        }
        
        .gauge__label--low {
            display: table-cell;
            text-align: center;
        }
        
        .gauge__label--spacer {
            display: table-cell;
        }
        
        .gauge__label--high {
            display: table-cell;
            text-align: center;
        }
        
        /*
        * Now define the rules that depend on the size of
        * the gauge. We start with sizing for a small mobile
        * device.
        */
        
        .gauge { height: calc(120px + 3em); }
        .gauge__container { width: 240px; height: 120px; }
        .gauge__marker { height: 120px; left: 119.5px; }
        .gauge__background { width: 240px; height: 120px; }
        .gauge__center { width: 144px; height: 72px; top: 48px; margin-left: 48px; }
        .gauge__data { width: 240px; height: 120px; }
        .gauge__needle { left: 120px; top: 117px; width: 120px; }
        .gauge__labels { top: 120px; width: 240px; }
        .gauge__label--low { width: 48px; }
        .gauge__label--spacer { width: 144px; }
        .gauge__label--high { width: 48px; }
        
        /*
        * Increase the gauge size slightly on larger viewports.
        */
        
        @media only screen and (min-width: 400px) {
            .gauge { height: calc(150px + 3em); }
            .gauge__container { width: 300px; height: 150px; }
            .gauge__marker { height: 150px; left: 149.5px; }
            .gauge__background { width: 300px; height: 150px; }
            .gauge__center { width: 180px; height: 90px; top: 60px; margin-left: 60px; }
            .gauge__data { width: 300px; height: 150px; }
            .gauge__needle { left: 150px; top: 147px; width: 150px; }
            .gauge__labels { top: 150px; width: 300px; }
            .gauge__label--low { width: 60px; }
            .gauge__label--spacer { width: 180px; }
            .gauge__label--high { width: 60px; }
        }
        
        /*
        * As an option, the 'gauge--liveupdate' class can be added
        * to the main gauge element. When this class is present,
        * we add a transition that animates any changes to the gauge
        * value. Currently, the app does not use this option because
        * all the inputs that can change gauge values are present
        * on tab panels that are different from the gauge itself.
        * Therefore, users won't be able to see any gauge changes
        * when they make input changes. The code is available, though,
        * should this change.
        */
        
        .gauge--liveupdate .gauge__data,
        .gauge--liveupdate .gauge__needle {
            transition: all 1s ease-in-out;
        }
        
        /*
        * For a given gauge value, x, ranging from 0.0 to 1.0, set
        * the 'transform: rotate()' property according to the
        * following equation: '-0.5 + 0.5x turns' The default
        * properties below represent an x value of 0.
        */
        
        .gauge__data {
            transform: rotate(-.50turn);
        }
        .gauge__needle {
            -transform: rotate(-.50turn);
        }`;

    static override readonly template = html`
        <div class="gauge gauge--liveupdate" id="gauge">
            <div class="gauge__container">
                <div class="gauge__marker"></div>
                <div class="gauge__background"></div>
                <div class="gauge__center"></div>
                <div id="gauge__data" class="gauge__data"></div>
                <div id="gauge__needle" class="gauge__needle"></div>
            </div>
            <div class="gauge__labels mdl-typography__headline">
                <span class="gauge__label--low">No</span>
                <span class="gauge__label--spacer"></span>
                <span class="gauge__label--high">Yes</span>
            </div>
        </div>`;

    static readonly is = "node-projects-material-gauge";

    static readonly properties = {
        value: Number
    }

    private _data: HTMLDivElement;
    private _needle: HTMLDivElement;

    constructor() {
        super();
        this._restoreCachedInititalValues();
        this._data = this._getDomElement<HTMLDivElement>('gauge__data');
        this._needle = this._getDomElement<HTMLDivElement>('gauge__needle');
    }

    ready() {
        this._parseAttributesToProperties();
        this.refresh();
    }

    private _value: number = 0.0;
    get value() { return this._value; }
    set value(value: number) { this._value = value; this.refresh(); }

    refresh() {
        const turns = -0.5 + (this._value * 0.5);
        this._data.style.transform = "rotate(" + turns + "turn)";
        this._needle.style.transform = "rotate(" + turns + "turn)";
    }
}

customElements.define(MaterialGaugeComponent.is, MaterialGaugeComponent);