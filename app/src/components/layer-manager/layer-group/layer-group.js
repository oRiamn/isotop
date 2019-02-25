require('./layer-group.scss');

require('../layer-item/layer-item');

import html from './layer-group.pug';

window.customElements.define('layer-group', class extends HTMLElement {
	constructor() {
		super();
	}
	
	connectedCallback() {
		
		const shadow = document.createElement('div');
		shadow.innerHTML = html;

		const items = shadow.querySelector('.items');
		const label = shadow.querySelector('editable-label');

		const layers = this.querySelectorAll(':scope > layer-item,:scope > layer-group');
		layers.forEach( (layer) => {
			items.appendChild(layer);
		});

		label.textContent = this.textContent.split(',', 1)[0];
		
		this.innerHTML=shadow.innerHTML;
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
		
	}
});