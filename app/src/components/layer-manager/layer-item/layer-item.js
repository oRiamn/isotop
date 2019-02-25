require('./layer-item.scss');

import html from './layer-item.pug';

window.customElements.define('layer-item', class extends HTMLElement {
	constructor() {
		super();
	}

	select(e) {
		e.stopPropagation();
		e.preventDefault();
		const target = e.target;
	}

	connectedCallback() {
		const shadow = document.createElement('div');
		shadow.innerHTML = html;
		const label = shadow.querySelector('editable-label');
		label.textContent = this.textContent.split(',', 1)[0];
		this.innerHTML=shadow.innerHTML;
		
		this.querySelector(':scope > a').addEventListener('click', (e) => this.select(e));
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
		
	}
});