require('@components/editable-label/editable-label');

require('./layer-group/layer-group');
require('./layer-item/layer-item');

require('./layer-manager.scss');
import html from './layer-manager.pug';

window.customElements.define('layer-manager', class extends HTMLElement {
	constructor() {
		super();
		this.activeLists = [];
		this.dragSrcElement;
	}

	dragStart(e) {
		this.dragSrcElement = e.target;
		this.dragSrcElement.style.opacity = '0.4';
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', this.dragSrcElement.innerHTML);
	}

	dragEnter(e) {
		e.target.classList.add('over');
	}

	dragLeave(e) {
		e.stopPropagation();
		e.target.classList.remove('over');
	}

	dragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		return false;
	}

	dragDrop(e) {
		if (this.dragSrcElement != e.target) {
			this.dragSrcElement.innerHTML = e.target.innerHTML;
			e.target.innerHTML = e.dataTransfer.getData('text/html');
		}
		return false;
	}

	dragEnd(e) {
		var listItens = this.querySelectorAll('layer-group');
		[].forEach.call(listItens, function (item) {
			item.classList.remove('over');
		});
		e.target.style.opacity = '1';
	}

	addEventsDragAndDrop(el) {
		el.addEventListener('dragstart', (e) => this.dragStart(e), false);
		el.addEventListener('dragenter', (e) => this.dragEnter(e), false);
		el.addEventListener('dragover', (e) => this.dragOver(e), false);
		el.addEventListener('dragleave', (e) => this.dragLeave(e), false);
		el.addEventListener('drop', (e) => this.dragDrop(e), false);
		el.addEventListener('dragend', (e) => this.dragEnd(e), false);
	}


	connectedCallback() {
		this.innerHTML = html;

		const listHandles = this.querySelectorAll('layer-group');
		listHandles.forEach((handle) => {
			// handle.addEventListener('open', (e) => console.log('open'));
			// handle.addEventListener('close', (e) => console.log('close'));
		});

		const itemHandles = this.querySelectorAll('layer-item');
		itemHandles.forEach((handle) => {
			this.addEventsDragAndDrop(handle);
		});
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
	}
});