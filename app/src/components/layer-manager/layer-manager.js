require('./layer-manager.scss');
import html from './layer-manager.pug';

window.customElements.define('layer-manager',  class extends HTMLElement {
	constructor() {
		super();
	}
	
	connectedCallback() {
		this.innerHTML = html;
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
	}
});