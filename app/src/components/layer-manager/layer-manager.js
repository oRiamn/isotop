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

		const listHandles = this.querySelectorAll('layer-group');
		listHandles.forEach( (handle) => {
			handle.addEventListener('open', (e) => console.log('open'));
			handle.addEventListener('close', (e) => console.log('close'));
		});
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
	}
});