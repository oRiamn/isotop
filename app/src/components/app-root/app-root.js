import main from '@src/main.scss';

import css from './app-root.scss';
import html from './app-root.pug';

import ColorPicker from '@components/color-picker/color-picker';
import ToolBar from '@components/tool-bar/tool-bar';
import DrawZone from '@components/draw-zone/draw-zone';

import  CssColor from '@src/library/color/CssColor';

window.customElements.define('app-root',  class extends HTMLElement {
	constructor() {
		super();
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
});