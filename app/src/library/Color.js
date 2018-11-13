function hue2rgb(p, q, t) {
	if(t < 0) t += 1;
	if(t > 1) t -= 1;
	if(t < 1/6) return p + (q - p) * 6 * t;
	if(t < 1/2) return q;
	if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	return p;
}

function applyHSL(color) {

	const r = color.r,
		g = color.g,
		b = color.b,
		max = Math.max(r, g, b), 
		min = Math.min(r, g, b);

	color.l = (max + min) / 2;    
	if(max == min){
		color.h = color.s = 0; // achromatic
	} else {
		const d = max - min;
		color.s = color.l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max){
		case r: color.h = (g - b) / d + (g < b ? 6 : 0); break;
		case g: color.h = (b - r) / d + 2; break;
		case b: color.h = (r - g) / d + 4; break;
		}
		color.h /= 6;
	}
}

function applyRGB(color) {
	if(color.s == 0) {
		color.r = color.g = color.b = color.l; // achromatic
	} else {
		const q = color.l < 0.5 ? color.l * (1 + color.s) : color.l + color.s - color.l * color.s;
		const p = 2 * color.l - q;
		color.r = hue2rgb(p, q, color.h + 1/3);
		color.g = hue2rgb(p, q, color.h);
		color.b = hue2rgb(p, q, color.h - 1/3);
	}
}

const Sanitizer = {
	RGB: function() {
		var o = [];
		if(arguments.length == 0) return;
		for(var i = 0 ; i < arguments.length ; i++) {
			var c = arguments[i];
			if('string' == typeof c && c.indexOf('%') > -1) {
				if((c = parseInt(c)) == 'NaN')
					throw new Error('Bad format');
				if(c < 0 || c > 100)
					throw new Error('Bad format');
				o[i] = c/100;
			} else {
				if('string' == typeof c && (c = parseInt(c)) == 'NaN') throw new Error('Bad format');
				if(c < 0) throw new Error('Bad format');
				else if(c >= 0 && c <= 1) o[i] = c;
				else if(c > 1 && c < 256) o[i] = c/255;
				else throw new Error('Bad format');
			}
		}
		return o;
	},
	HSL: function() {
		if(arguments.length < 3 || arguments.length > 4) throw new Error('3 or 4 arguments required');
		var h = arguments[0],
			s = arguments[1],
			l = arguments[2];
		if('string' == typeof h && (h = parseFloat(h)) == 'NaN') throw new Error('Bad format for hue');
		if(h < 0 || h > 360) throw new Error('Hue out of range (0..360)');
		else if(((''+h).indexOf('.') > -1 && h > 1) || (''+h).indexOf('.') == -1) h /= 360;
		if('string' == typeof s && s.indexOf('%') > -1) {
			if((s = parseInt(s)) == 'NaN')
				throw new Error('Bad format for saturation');
			if(s < 0 || s > 100)
				throw new Error('Bad format for saturation');
			s /= 100;
		} else if(s < 0 || s > 1) throw new Error('Bad format for saturation');
		if('string' == typeof l && l.indexOf('%') > -1) {
			if((l = parseInt(l)) == 'NaN')
				throw new Error('Bad format for lightness');
			if(l < 0 || l > 100)
				throw new Error('Bad format for lightness');
			l /= 100;
		} else if(l < 0 || l > 1) throw new Error('Bad format for lightness');
		return [h, s, l];
	},
};

export const Color = class {
	constructor() {
		this.r = this.g = this.b = 0;
		this.h = this.s = this.l = 0;
		this.a = 1;
	}

	cssRGBA() {
		const r = Math.round(255*this.r),
			g = Math.round(255*this.g),
			b = Math.round(255*this.b),
			a = Math.round(255*this.a);
		
		return `rgba(${r},${g},${b},${a})`;
	}

	cssRGB() {
		const r = Math.round(255*this.r),
			g = Math.round(255*this.g),
			b = Math.round(255*this.b);
		
		return `rgb(${r},${g},${b})`;
	}

	fromHSL(hue, saturation, lightness, alpha = 1) {
		
		const sanitized=Sanitizer.HSL(hue, saturation, lightness, alpha);

		this.h=sanitized[0];
		this.s=sanitized[1];
		this.l=sanitized[2];
		this.a=sanitized[3];

		applyRGB(this);
	}
	
	fromHEX(hexString) {
		if(hexString.length === 3) {
			let color = '';
			for (let i = 0; i < hexString.length; i++) {
				color += hexString[i].slice(0, 1).repeat(2);
			}
			hexString=color;
		}
		
		const r = parseInt(hexString.substr(0, 2), 16),
			g = parseInt(hexString.substr(2, 2), 16),
			b = parseInt(hexString.substr(4, 2), 16);

		this.fromRGBA(r,g,b,1);

	}

	fromRGBA(red, green, blue, alpha = 1) {
		
		const sanitized=Sanitizer.RGB(red,green,blue,alpha);

		this.r=sanitized[0];
		this.g=sanitized[1];
		this.b=sanitized[2];
		this.a=sanitized[3];

		applyHSL(this);
	}
};