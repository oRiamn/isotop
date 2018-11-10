import html from './color-picker.pug';

export default class ColorPicker extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = html; // pug.renderFile('color-picker.pug');
	}
}

window.customElements.define('color-picker', ColorPicker);