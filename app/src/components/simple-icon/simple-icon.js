import css from './simple-icon.scss';
import html from './simple-icon.pug';

export default class SimpleIcon extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = html;

		this.prameters={
			type:{
				querySelector: 'i',
				callback: ( el, changes ) => el.className=changes.newVal
			},
			desc:{
				querySelector: 'a',
				callback: ( el, changes ) => el.title=changes.newVal
			}
		};
	}

	static get observedAttributes() {
		return ['type', 'desc'];
	}

	attributeChangedCallback(name, oldVal, newVal) {
		let parameter=this.prameters[name];

		if(parameter){

			if(!parameter.element){
				parameter.element=this.querySelector(parameter.querySelector);
			}

			parameter.callback.apply(null, [parameter.element, {oldVal:oldVal, newVal:newVal}]);			
		}
	}
}

window.customElements.define('simple-icon', SimpleIcon);