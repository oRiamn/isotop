require('./layer-manager.scss');
import html from './layer-manager.pug';
import { TSImportEqualsDeclaration } from 'babel-types';

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

	connectedCallback() {
		this.innerHTML = html;

		const list = this.querySelectorAll('.list > a');
		list.forEach( (listA) => {
			listA.addEventListener('click', (e) => this.toggleList(e));
		});
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
	}
});