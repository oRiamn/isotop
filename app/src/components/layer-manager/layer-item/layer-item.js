require('./layer-item.scss');

import html from './layer-item.pug';
import css from './layer-item.scss';

window.customElements.define('layer-item', class extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const shadow = document.createElement('div');
		shadow.innerHTML = html;
		const label = shadow.querySelector('editable-label');
		label.textContent = this.textContent.split(',', 1)[0];
		this.innerHTML=shadow.innerHTML;		
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
		
	}
});