import main from '@src/main.scss';

import css from './app-root.scss';
import html from './app-root.pug';

import ColorPicker from '@components/color-picker/color-picker';
import ToolBar from '@components/tool-bar/tool-bar';
import CanvasManager from '@components/draw-zone/draw-zone';

export default class AppRoot extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = html;
	}
}

window.customElements.define('app-root', AppRoot);