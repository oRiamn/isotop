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
		return '#' + ( ( this.hex === 0x0 ) ? '000000' : this.hex.toString(16) );
	}

	toRGB() {
		const r = Math.round(255*this.rgb.r),
			g = Math.round(255*this.rgb.g),
			b = Math.round(255*this.rgb.b);
		
		return `rgb(${r},${g},${b})`;
	}

};