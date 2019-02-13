import  Color from './Color';

export default class CssColor extends Color {
	constructor(){
		super();
	}

	toRGBA() {
		const r = Math.round(255*this.rgb.r),
			g = Math.round(255*this.rgb.g),
			b = Math.round(255*this.rgb.b);
		
		return `rgba(${r},${g},${b},${this.a})`;
	}

	toHSL() {
		const h = Math.round(360*this.hsl.h),
			s = Math.round(100*this.hsl.s),
			l = Math.round(100*this.hsl.l);
		
		return `hsl(${h},${s}%,${l}%)`;
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

}