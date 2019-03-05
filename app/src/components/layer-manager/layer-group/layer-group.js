require('./layer-group.scss');

require('../layer-item/layer-item');

import html from './layer-group.pug';

window.customElements.define('layer-group', class extends HTMLElement {
	constructor() {
		super();

		this.activeSubGroup;

		this.openEvent = new CustomEvent('open', {
			bubbles: true,
			cancelable: false,
		});

		this.closeEvent = new CustomEvent('close', {
			bubbles: true,
			cancelable: false,
		});
	}

	open(){
		this.classList.add('active');
		this.dispatchEvent(this.openEvent);
	}

	close(){
		this.classList.remove('active');
		if(this.activeSubGroup) {
			this.activeSubGroup.close();
			this.activeSubGroup = null;
		}

		this.dispatchEvent(this.closeEvent);		
	}
	
	toggle(e) {
		e.stopPropagation();
		e.preventDefault();
		if (this.classList.contains('active')) {
			this.close();
		} else {
			this.open();
		}
	}

	subgroupOpen(e){
		if(this.activeSubGroup) {
			this.activeSubGroup.close();
		}
		this.activeSubGroup=e.target;
		this.activeSubGroup.addEventListener('close', (e) => this.activeSubGroup = null);
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
		this.addEventListener('click', (e) => this.toggle(e));

		const subgroups = this.querySelectorAll(':scope > .items > layer-group');
		subgroups.forEach( (subgroup) => {
			subgroup.addEventListener('open', (e) => this.subgroupOpen(e));
		});
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
		
	}
});