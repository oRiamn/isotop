require('@components/color-picker/color-picker');
require('@components/tool-bar/tool-bar');
require('@components/draw-zone/draw-zone');

require('./app-root.scss');
import html from './app-root.pug';

import  CssColor from '@src/library/color/CssColor';

window.customElements.define('app-root',  class extends HTMLElement {
	constructor() {
		super();
	}
	
	connectedCallback() {
		this.innerHTML = html;
		
		const color = new CssColor();
		color.fromRGBA(180,90,90);

		this.colorpicker = this.querySelector('color-picker');
		this.drawzone = this.querySelector('draw-zone');
		this.inputColor = this.querySelector('input#color');
		
		this.colorpicker.color = color;
		this.colorpicker.setCursorColor(color);
		this.drawzone.brush.color = color;
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
	}
});