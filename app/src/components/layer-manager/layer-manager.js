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
		this.dragSrcElement.classList.add('ondrag');
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
	}

	dragDrop(e, element) {
		e.preventDefault();
		if (this.dragSrcElement != element) {
			this.dragSrcElement.parentNode.removeChild(this.dragSrcElement);
			element.parentNode.insertBefore(this.dragSrcElement, element.nextSibling);
		}
		this.resetDrag();
	}

	resetDrag() {
		const listItens = this.querySelectorAll('.over');
		listItens.forEach((item) => {
			item.classList.remove('over');
		});
		this.dragSrcElement.classList.remove('ondrag');
	}

	addEventsDragAndDrop(el) {
		el.draggable=true;
		el.addEventListener('dragstart', (e) => this.dragStart(e, el), false);
		el.addEventListener('dragenter', (e) => this.dragEnter(e, el), false);
		el.addEventListener('dragover', (e) => this.dragOver(e, el), false);
		el.addEventListener('dragleave', (e) => this.dragLeave(e, el), false);
		el.addEventListener('drop', (e) => this.dragDrop(e, el), false);
		el.addEventListener('dragend', (e) => this.resetDrag(e, el), false);
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