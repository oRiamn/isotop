require('./editable-label.scss');

window.customElements.define('editable-label', class extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.addEventListener('dblclick', (e) => this.setSelection(e), true);

		this.addEventListener('keydown', (e) => {
			if(e.keyCode === 13) {
				this.removeSelection(e);
			}				
		} );
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
		
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
		node.removeEventListener('blur', (e) => this.removeSelection(e), true);
	}
});