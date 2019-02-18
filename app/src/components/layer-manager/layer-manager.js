require('./layer-manager.scss');
import html from './layer-manager.pug';

window.customElements.define('layer-manager', class extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = html;

		const list = this.querySelectorAll('.list > a');

		for (let i = 0; i < list.length; i++) {
			list[i].addEventListener('click', (e) => {
				
				e.stopPropagation();
				e.preventDefault();

				const target = e.target.parentElement;
				if (target.classList.contains('active')) {
					target.classList.remove('active');
				}
				else if (target.parentElement.parentElement.classList.contains('active')) {
					target.classList.add('active');
				}
				else {
					for (let y = 0; y < list.length; y++) {
						list[y].classList.remove('active');
					}
					target.classList.add('active');
				}
				
			});
		}
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
	}
});