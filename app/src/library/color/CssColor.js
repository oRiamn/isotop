import { Color } from './Color';

export const CssColor = class extends Color {
	constructor(){
		super();
	}

	toRGBA() {
		const r = Math.round(255*this.r),
			g = Math.round(255*this.g),
			b = Math.round(255*this.b);
		
		return `rgba(${r},${g},${b},${this.a})`;
	}

	toHEX() {
		return '#' + 
			(255*this.r < 16 ? '0' : '') + Math.round(255*this.r).toString(16) +
			(255*this.g < 16 ? '0' : '') + Math.round(255*this.g).toString(16) + 
			(255*this.b < 16 ? '0' : '') + Math.round(255*this.b).toString(16);
	}

	toRGB() {
		const r = Math.round(255*this.r),
			g = Math.round(255*this.g),
			b = Math.round(255*this.b);
		
		return `rgb(${r},${g},${b})`;
	}

};