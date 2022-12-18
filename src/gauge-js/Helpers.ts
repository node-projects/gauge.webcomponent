export const secondsToString = function(sec: string | number) {
	let hr = Math.floor(sec / 3600);
	let min = Math.floor((sec - (hr * 3600)) / 60);
	sec -= ((hr * 3600) + (min * 60));
	sec += '';
	min += '';
	while (min.length < 2) {
		min = '0' + min;
	}
	while (sec.length < 2) {
		sec = '0' + sec;
	}
	hr = hr ? hr + ':' : '';
	return hr + min + ':' + sec;
};

export const formatNumber = function(...num: {}) {
	const value = num[0];
	const digits = 0 || num[1];
	return addCommas(value.toFixed(digits));
};

export const addCommas = function(nStr: string) {
	nStr += '';
	const x = nStr.split('.');
	let x1 = x[0];
	let x2 = '';
	if (x.length > 1) {
		x2 = '.' + x[1];
	}
	const rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, "$1,$2");
	}
	return x1 + x2;
};

export const cutHex = function(nStr: { charAt: (arg0: number) => string; substring: (arg0: number, arg1: number) => any; }) {
	if (nStr.charAt(0) === "#") {
		return nStr.substring(1, 7);
	}
	return nStr;
};