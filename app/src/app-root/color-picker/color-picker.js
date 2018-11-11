import css from './color-picker.scss';
import html from './color-picker.pug';

export default class ColorPicker extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = html;
	}
}

window.customElements.define('color-picker', ColorPicker);