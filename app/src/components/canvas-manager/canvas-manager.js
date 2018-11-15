import css from './canvas-manager.scss';
import html from './canvas-manager.pug';

import { Point } from '@lib/figure/Point';
import { Ring } from '@lib/figure/Circle';
import { Canvas2d } from '@lib/Canvas';
import { Color } from '@lib/Color';

export default class CanvasManager extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = html;

		const size=200;

		this.color = new Color();
		this.cursor = new Ring(new Point(-20000,-20000),3, 2);

		this.canvas = this.querySelector('.canvas');
		this.canvas.style.width = `${size}px`;
		this.canvas.style.height = `${size}px`;
	}
}

window.customElements.define('canvas-manager', CanvasManager);