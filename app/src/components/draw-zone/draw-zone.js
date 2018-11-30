import css from './draw-zone.scss';
import html from './draw-zone.pug';

import { Point } from '@lib/figure/Point';
import { Ring } from '@lib/figure/Ring';
import { Canvas2d } from '@lib/Canvas';
import { Color } from '@src/library/color/Color';
import { Circle } from '../../library/figure/Circle';
import { Brush } from '@lib/brushs';

export default class DrawZone extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = html;

		const size=400;

		this.color = new Color();
		this.brush = new Brush(new Point(-20000,-20000), this.color, 10);
		this.cursor = new Ring(new Point(-20000,-20000),this.brush.width/2, 1);
		this.active = false;

		this.color.fromHEX('000');

		this.canvasContainer = this.querySelector('.canvas');
		this.canvasContainer.style.width=`${size}px`;
		this.canvasContainer.style.height=`${size}px`;

		this.container = this.querySelector('.container');

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

}

window.customElements.define('draw-zone', DrawZone);