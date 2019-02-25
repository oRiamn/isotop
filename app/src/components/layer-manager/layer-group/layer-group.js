require('./layer-group.scss');

require('../layer-item/layer-item');

import html from './layer-group.pug';

window.customElements.define('layer-group', class extends HTMLElement {
	constructor() {
		super();
	}
	
	toggle(e) {
		e.stopPropagation();
		e.preventDefault();
		const target = e.target.parentElement;
		if (target.classList.contains('active')) {
			target.classList.remove('active');
		} else {
			target.classList.add('active');
		}
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
		this.querySelector(':scope > a').addEventListener('click', (e) => this.toggle(e));
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
		
	}
});