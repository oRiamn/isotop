import icon from '@components/simple-icon/simple-icon';
import html from './tool-bar.pug';

class ToolBar extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = html;
	}
}

window.customElements.define('tool-bar', ToolBar);