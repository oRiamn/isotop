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

		const size=4000;

		this.color = new Color();
		this.cursor = new Ring(new Point(-20000,-20000),3, 2);

		const c = this.querySelector('.canvas');
		c.style.width=`${size}px`;
		c.style.height=`${size}px`;

		this.canvas = [];
		this.querySelectorAll('canvas').forEach((element) => {
			this.canvas.push(new Canvas2d(
				element, {
					width: size, 
					height: size
				}
			));
		});		
	}
}

window.customElements.define('draw-zone', DrawZone);