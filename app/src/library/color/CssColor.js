import { Color } from './Color';

export const CssColor = class extends Color {
	constructor(){
		super();
	}

	toRGBA() {
		const r = Math.round(255*this.rgb.r),
			g = Math.round(255*this.rgb.g),
			b = Math.round(255*this.rgb.b);
		
		return `rgba(${r},${g},${b},${this.a})`;
	}

	toHEX() {
		const hexString = '' +
		((this.hex >> 24) & 0xFF).toString(16) +
		((this.hex >> 16) & 0xFF).toString(16) +
		((this.hex >> 8) & 0xFF).toString(16) +
		(this.hex & 0xFF).toString(16) +
			'000000'; // padding 

		return '#' + hexString.slice(1).substring(0, 6);
	}

	toRGB() {
		const r = Math.round(255*this.rgb.r),
			g = Math.round(255*this.rgb.g),
			b = Math.round(255*this.rgb.b);
		
		return `rgb(${r},${g},${b})`;
	}

};