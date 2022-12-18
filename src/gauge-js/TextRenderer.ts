import { formatNumber } from "./Helpers.js";

export class TextRenderer {
    el: any;
    fractionDigits: any;
	constructor(el: any, fractionDigits: any) {
		this.el = el;
		this.fractionDigits = fractionDigits;
	}

	// Default behaviour, override to customize rendering
	render(gauge: { displayedValue: unknown; }) {
		return this.el.innerHTML = formatNumber(gauge.displayedValue, this.fractionDigits);
	}
}