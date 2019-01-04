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

		const r = Math.round(255*this.rgb.r),
			g = Math.round(255*this.rgb.g),
			b = Math.round(255*this.rgb.b);
		
		return '#' + 
			(r < 16 ? '0' : '') + Math.round(r).toString(16) +
			(g < 16 ? '0' : '') + Math.round(g).toString(16) + 
			(b < 16 ? '0' : '') + Math.round(b).toString(16);
	}

	toRGB() {
		const r = Math.round(255*this.rgb.r),
			g = Math.round(255*this.rgb.g),
			b = Math.round(255*this.rgb.b);
		
		return `rgb(${r},${g},${b})`;
	}

};