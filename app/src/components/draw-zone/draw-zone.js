import css from './draw-zone.scss';
import html from './draw-zone.pug';

import Point from '@lib/figure/Point';
import Ring from '@lib/figure/Ring';
import Canvas2d from '@src/library/Canvas2d';
import  CssColor from '@src/library/color/CssColor';
import SimpleDotBrush from '@lib/brush/SimpleDotBrush';

window.customElements.define('draw-zone',  class extends HTMLElement {

	constructor() {
		super();

		const size=400;

		this.width = size;
		this.height = size;

		this.color = new CssColor();
		this.brush = new SimpleDotBrush(new Point(-20000,-20000), this.color, 10);
		this.cursor = new Ring(new Point(-20000,-20000),this.brush.width/2, 1);
		this.active = false;

		this.color.fromHEX('000');
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback() {
	}

	connectedCallback() {
		this.innerHTML = html;

		this.canvasContainer = this.querySelector('.canvas');
		this.canvasContainer.style.width=`${this.width}px`;
		this.canvasContainer.style.height=`${this.height}px`;

		this.container = this.querySelector('.container');

		this.canvasDot = new Canvas2d(
			this.querySelector('.dot'), {
				width: this.width, 
				height: this.height
			}
		);

		this.layers = [];
		this.querySelectorAll('.layers canvas').forEach((element) => {
			this.layers.push(new Canvas2d(
				element, {
					width: this.width, 
					height: this.height
				}
			));
		});
		
		this.selectedLayer = this.layers[0];

		this.setEvents();
	}

	setActive(active){
		if(active){
			this.active=true;
		} else {
			this.active=false;
		}
	}

	drawCursor() {
		// clear dot canvas
		this.canvasDot.clearAll();
		this.cursor.draw(this.canvasDot.ctx,{
			stroke: '#000'
		});
	}

	update(e) {
		// get mouse pos
		const x = e.clientX - this.offsetLeft + this.container.scrollLeft,
			y = e.clientY - this.offsetTop + this.container.scrollTop;

		this.cursor.center.moveTo(x,y);
		this.brush.moveTo(x,y);
		this.drawCursor();

		if(this.active){
			this.brush.draw(this.selectedLayer.ctx);
		}
	}

	setEvents() {
		const self = this;
		this.canvasDot.canvas.addEventListener('mousemove', e => {
			self.update(e);
		}, false);

		this.canvasDot.canvas.addEventListener('mousedown', e => {
			this.setActive(true);
		}, false);
		
		this.canvasDot.canvas.addEventListener('mouseup', () => {
			this.setActive(false);
		}, false);
	}

});
