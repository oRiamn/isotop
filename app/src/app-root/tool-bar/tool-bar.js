import css from './icons.scss';
import html from './tool-bar.pug';

export default class ToolBar extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = html;
	}
}

window.customElements.define('tool-bar', ToolBar);