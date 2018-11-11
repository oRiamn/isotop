import main from '@src/main.scss';

import css from './app-root.scss';
import html from './app-root.pug';

import ColorPicker from './color-picker/color-picker';
import ToolBar from './tool-bar/tool-bar';

export default class AppRoot extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = html;
	}
}

window.customElements.define('app-root', AppRoot);