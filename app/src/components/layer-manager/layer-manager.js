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

	toggleList(e) {
		e.stopPropagation();
		e.preventDefault();
		const target = e.target.parentElement;
		if (target.classList.contains('active')) {
			target.classList.remove('active');
			this.activeLists.splice(this.activeLists.indexOf(target), 1);
		} else {
			if (!target.parentElement.parentElement.classList.contains('active')) {
				this.activeLists.forEach((activeElement) => activeElement.classList.remove('active'));
				this.activeLists = [];
			}
			target.classList.add('active');
			this.activeLists.push(target);
		}
	}

	layerClick(e) {
		e.stopPropagation();
		e.preventDefault();
		const target = e.target;
		console.log(target.textContent);
	}

	connectedCallback() {
		this.innerHTML = html;

		const listHandles = this.querySelectorAll('layer-group > a');
		listHandles.forEach((handle) => {
			handle.addEventListener('click', (e) => this.toggleList(e));
		});

		const itemHandles = this.querySelectorAll('layer-item > a');
		itemHandles.forEach((handle) => {
			handle.addEventListener('click', (e) => this.layerClick(e));
		});
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
	}
});