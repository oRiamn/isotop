require('@components/editable-label/editable-label');

require('./layer-group/layer-group');
require('./layer-item/layer-item');

require('./layer-manager.scss');
import html from './layer-manager.pug';

window.customElements.define('layer-manager', class extends HTMLElement {
	constructor() {
		super();
		this.activeLists = [];
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