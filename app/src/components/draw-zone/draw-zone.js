import css from './draw-zone.scss';
import html from './draw-zone.pug';

import { Point } from '@lib/figure/Point';
import { Ring } from '@lib/figure/Circle';
import { Canvas2d } from '@lib/Canvas';
import { Color } from '@lib/Color';

export default class DrawZone extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = html;

		const size=400;

		this.color = new Color();
		this.cursor = new Ring(new Point(-20000,-20000),10, 1);

		this.canvasContainer = this.querySelector('.canvas');
		this.canvasContainer.style.width=`${size}px`;
		this.canvasContainer.style.height=`${size}px`;

		this.canvasDot = new Canvas2d(
			this.querySelector('.dot'), {
				width: size, 
				height: size
			}
		);

		this.layers = [];
		this.querySelectorAll('.layers canvas').forEach((element) => {
			this.layers.push(new Canvas2d(
				element, {
					width: size, 
					height: size
				}
			));
		});
		
		this.selectedLayer = this.layers[0];

		this.setEvents();
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
		const x = e.clientX - this.offsetLeft,
			y = e.clientY - this.offsetTop;
		this.cursor.center.moveTo(x,y);
		this.drawCursor();
	}

	setEvents() {
		const self = this;
		this.canvasDot.canvas.addEventListener('mousemove', e => {
			self.update(e);
		}, false);
	}


}

window.customElements.define('draw-zone', DrawZone);