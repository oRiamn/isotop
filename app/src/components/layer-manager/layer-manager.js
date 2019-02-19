require('./layer-manager.scss');
import html from './layer-manager.pug';

window.customElements.define('layer-manager', class extends HTMLElement {
	constructor() {
		super();

		this.activeLists =  [];
	}

	toggleList(e){
		e.stopPropagation();
		e.preventDefault();
		const target = e.target.parentElement;
		if (target.classList.contains('active')) {
			target.classList.remove('active');
			this.activeLists.splice( this.activeLists.indexOf(target), 1 );
		} else {
			if (!target.parentElement.parentElement.classList.contains('active')) {
				this.activeLists.forEach((activeElement) => activeElement.classList.remove('active'));
				this.activeLists=[];
			}
			target.classList.add('active');
			this.activeLists.push(target);
		}
	}

	layerClick(e) {
		e.stopPropagation();
		e.preventDefault();
		const target = e.target;
		console.log(target.innerText);
	}

	setSelection(e) {
		const node = e.target,
			selection = window.getSelection(),
			range = document.createRange();

		node.contentEditable=true;
		range.selectNodeContents( node );
		selection.removeAllRanges();
		selection.addRange( range );
		node.addEventListener('blur', (e) => this.removeSelection(e));
	}

	removeSelection(e) {
		const node = e.target,
			selection = window.getSelection();
			
		selection.removeAllRanges();
		node.contentEditable=false;
		node.removeEventListener('blur', (e) => this.removeSelection(e));
	}

	connectedCallback() {
		this.innerHTML = html;

		const listHandles = this.querySelectorAll('.list > a');
		listHandles.forEach( (handle) => {
			handle.addEventListener('click', (e) => this.toggleList(e));
		});

		const itemHandles = this.querySelectorAll(':not(.list) > a');
		itemHandles.forEach( (handle) => {
			handle.addEventListener('click', (e) => this.layerClick(e));
		});

		const labels = this.querySelectorAll('a > span');
		labels.forEach( (label) => {
			label.addEventListener('dblclick', (e) => this.setSelection(e), true);

			label.addEventListener('keydown', (e) => {
				if(e.keyCode === 13) {
					this.removeSelection(e);
				}				
			} );
		});
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
	}
});