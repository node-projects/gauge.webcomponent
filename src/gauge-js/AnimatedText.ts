import { addCommas, formatNumber, secondsToString } from "./Helpers.js";
import { ValueUpdater } from "./ValueUpdater.js";

export class AnimatedText extends ValueUpdater {
    elem: any;
    text: boolean;
   
	setVal(value: number) {
		return this.value = 1 * value;
	}

	constructor(elem: any, text: boolean) {
		super(false, false);
        this.displayedValue = 0
		this.elem = elem;
		if (text == null) { text = false; }
		this.text = text;
		if (this.elem === undefined) {
			throw new Error('The element isn\'t defined.');
		}
		this.value = 1 * this.elem.innerHTML;
		if (this.text) {
			this.value = 0;
		}
	}
	render() {
		let textVal: string;
		if (this.text) {
			textVal = secondsToString(this.displayedValue.toFixed(0));
		} else {
			textVal = addCommas(formatNumber(this.displayedValue));
		}
		return this.elem.innerHTML = textVal;
	}
}

/*export const AnimatedTextFactory = {
	create(objList: any) {
		const out: any[] = [];
		for (let elem of Array.from(objList)) {
			out.push(new AnimatedText(elem, false));
		}
		return out;
	}
};*/