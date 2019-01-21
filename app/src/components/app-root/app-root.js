import main from '@src/main.scss';

import css from './app-root.scss';
import html from './app-root.pug';

import ColorPicker from '@components/color-picker/color-picker';
import ToolBar from '@components/tool-bar/tool-bar';
import DrawZone from '@components/draw-zone/draw-zone';

import { CssColor } from '@src/library/color/CssColor';

export default class AppRoot extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = html;

		const color = new CssColor();
		color.fromRGBA(180,90,90);

		this.colorpicker = this.querySelector('color-picker');
		this.drawzone = this.querySelector('draw-zone');
		this.inputColor = this.querySelector('input#color');

		const rgb = this.querySelector('#rgb'),
			hex = this.querySelector('#hex'),
			hsl = this.querySelector('#hsl');

		const colorInput = new CssColor();
		this.inputColor.oninput = () => {
			colorInput.fromHEX(this.inputColor.value);
			this.colorpicker.setCursorColor(colorInput);
		};

		

		this.colorpicker.onchange = () => {
			//this.inputColor.value = this.colorpicker.color.toHEX();
			rgb.textContent = this.colorpicker.color.toRGB() + '\n' + colorInput.toRGB();
			hsl.textContent = this.colorpicker.color.toHSL() + '\n' + colorInput.toHSL();
			hex.textContent = this.colorpicker.color.toHEX() + '\n' + colorInput.toHEX();
		};	

		this.colorpicker.color = color;
		this.colorpicker.setCursorColor(color);
		this.drawzone.brush.color = color;
	}
}

window.customElements.define('app-root', AppRoot);