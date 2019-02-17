require('./layer-manager.scss');
import html from './layer-manager.pug';

window.customElements.define('layer-manager', class extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = html;

		const list = this.querySelectorAll('.list');

		for (let i = 0; i < list.length; i++) {
			list[i].addEventListener('click', (e) => {
				
				e.stopPropagation();
				e.preventDefault();
				
				if (list[i].classList.contains('active')) {
					list[i].classList.remove('active');
				}
				else if (list[i].parentElement.parentElement.classList.contains('active')) {
					list[i].classList.add('active');
				}
				else {
					for (let y = 0; y < list.length; y++) {
						list[y].classList.remove('active');
					}
					list[i].classList.add('active');
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