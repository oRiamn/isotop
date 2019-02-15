import icon from '@components/simple-icon/simple-icon';
import html from './tool-bar.pug';

window.customElements.define('tool-bar', class extends HTMLElement {
	constructor() {
		super();
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
		
	}

	connectedCallback() {
		this.innerHTML = html;
	}
});