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

	dragStart(e, element) {
		this.dragSrcElement = element;
		e.dataTransfer.setData('text/html', this.dragSrcElement.innerHTML);
	}

	dragEnter(e,element) {
		if (this.dragSrcElement != element) {
			element.classList.add('over');
		}
	}

	dragLeave(e, element) {
		e.stopPropagation();
		element.classList.remove('over');
	}

	dragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		return false;
	}

	dragDrop(e, element) {
		if (this.dragSrcElement != element) {
			this.dragSrcElement.innerHTML = element.innerHTML;
			element.innerHTML = e.dataTransfer.getData('text/html');

			const listItens = this.querySelectorAll('.over');
			listItens.forEach((item) => {
				item.classList.remove('over');
			});
		}
		return false;
	}

	dragEnd(e, element) {
		const listItens = this.querySelectorAll('.over');
		listItens.forEach((item) => {
			item.classList.remove('over');
		});
	}

	addEventsDragAndDrop(el) {
		el.draggable=true;
		el.addEventListener('dragstart', (e) => this.dragStart(e, el), false);
		el.addEventListener('dragenter', (e) => this.dragEnter(e, el), false);
		el.addEventListener('dragover', (e) => this.dragOver(e, el), false);
		el.addEventListener('dragleave', (e) => this.dragLeave(e, el), false);
		el.addEventListener('drop', (e) => this.dragDrop(e, el), false);
		el.addEventListener('dragend', (e) => this.dragEnd(e, el), false);
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