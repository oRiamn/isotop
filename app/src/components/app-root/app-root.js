import main from '@src/main.scss';

import css from './app-root.scss';
import html from './app-root.pug';

import ColorPicker from '@components/color-picker/color-picker';
import ToolBar from '@components/tool-bar/tool-bar';
import DrawZone from '@components/draw-zone/draw-zone';

import { Color } from '@lib/Color';

export default class AppRoot extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = html;

		const color = new Color();
		color.fromHEX('000');

		this.colorpicker = this.querySelector('color-picker');
		this.drawzone = this.querySelector('draw-zone');

		this.colorpicker.color = color;
		this.drawzone.brush.color = color;
		

		
	}
}

window.customElements.define('app-root', AppRoot);