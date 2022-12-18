import { formatNumber } from "./Helpers.js";

export class Bar {
    elem: any;
    value: any;
    maxValue: any;
    avgValue: any;
    textField: any;
	constructor(elem: any) {
		this.elem = elem;
	}
	updateValues(arrValues: {}) {
		this.value = arrValues[0];
		this.maxValue = arrValues[1];
		this.avgValue = arrValues[2];
		return this.render();
	}

	render() {
		if (this.textField) {
			this.textField.text(formatNumber(this.value));
		}

		if (this.maxValue === 0) {
			this.maxValue = this.avgValue * 2;
		}

		//const valPercent = (this.value / this.maxValue) * 100;
		//const avgPercent = (this.avgValue / this.maxValue) * 100;

//todo - no jequery
		//$(".bar-value", this.elem).css( { "width": valPercent + "%" } );
		//return $(".typical-value", this.elem).css( { "width": avgPercent + "%" } );
	}
}