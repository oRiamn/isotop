import css from './color-picker.scss';
import html from './color-picker.pug';

import { toRadians } from '@lib/collision.js';
import { Point } from '@lib/figure/Point';
import { Ring } from '@lib/figure/Circle';
import { EquilateralTriangle } from '@lib/figure/Triangle';
import { Canvas2d } from '@lib/Canvas';
import { Circle } from '@lib/figure/Circle';
import { Color } from '@lib/Color';

export default class ColorPicker extends HTMLElement {

	constructor() {
		super();
		this.innerHTML = html;
		
		let size=150;

		// canvas setup
		this.width = size;
		this.height = size;

		this.center = new Point(this.width / 2,this.height / 2);
		this.ring = new Ring(this.center,(size / 2) - 5, 20);
		this.triangle = new EquilateralTriangle(this.center,this.ring.radSmall-10, 0);
		
		// event variables
		this.active = false;
		this.color = new Color();
		this.cursor = new Ring(new Point(-20000,-20000),3, 2);

		// segment construction
		let segmentPoints=50;
		this.segment={
			points: segmentPoints,
			angle: 360 / segmentPoints,
			arc: Math.PI * 2 / segmentPoints
		};

		// canvas
		this.canvasRing = new Canvas2d(
			this.querySelector('.ring'), {
				width: this.width, 
				height: this.height
			}
		);

		this.canvasTriangle = new Canvas2d(
			this.querySelector('.triangle'), {
				width: this.width, 
				height: this.height
			}
		);
		this.canvasTriangle.ctx.globalCompositeOperation = 'hard-light';

		this.canvasDot = new Canvas2d(
			this.querySelector('.dot'), {
				width: this.width, 
				height: this.height
			}
		);

		this.drawRing();
		this.drawTriangle();

		// add events
		this.setEvents();
	}

	setActive(active){
		if(active){
			this.active=true;
			this.style.cursor = 'none';
		} else {
			this.active=false;
			this.style.cursor = 'auto';
		}
	}

	drawRing() {
		const innerBoundary = new Circle(this.ring.center, this.ring.radSmall),
			outerBoundary = new Circle(this.ring.center, this.ring.radLarge),
			radius = this.ring.radSmall + (this.ring.radLarge - this.ring.radSmall) / 2,
			arcStep = 0.001;

		for (let i = 1; i <= this.segment.points; i++) {
			
			// arc points
			const a = i * this.segment.angle,
				b = (i - 1) * this.segment.angle;
			
			const aRad = toRadians(a),
				bRad = toRadians(b);
			

			// gradient vector
			const startPoint = new Point(
				Math.cos(aRad) * radius + this.ring.center.x,
				Math.sin(aRad) * radius + this.ring.center.y
			);
			const endPoint = new Point(
				Math.cos(bRad) * radius + this.ring.center.x,
				Math.sin(bRad) * radius + this.ring.center.y
			);
			
			// gradient
			const g = this.canvasRing.createLinearGradient(startPoint,endPoint);
			g.addColorStop(0, `hsl( ${a}, 100%, 50%)`);
			g.addColorStop(1, `hsl( ${b}, 100%, 50%)`);
			
			this.canvasRing.beginPath();
			this.canvasRing.arc(innerBoundary, bRad - arcStep, aRad + arcStep, false);
			this.canvasRing.arc(outerBoundary,  aRad + arcStep, bRad - arcStep, true);
			this.canvasRing.setFillStyle(g);
			this.canvasRing.fill();
		}
	}

	update(e) {
		if(this.active){
			// get mouse pos
			const x = e.clientX - this.offsetLeft,
				y = e.clientY - this.offsetTop;

			this.cursor.center.moveTo(x,y);
	
			// draw
			if (this.ring.collision(this.cursor.center)) {
				this.drawTriangle();
				this.drawCursor();
			}
			else if (this.triangle.collision(this.cursor.center)) {
				this.drawCursor(true);
			}
		}
	}

	drawTriangle() {
		const imgData = this.canvasRing.getImageData(this.cursor.center, 1, 1).data;
		this.color.fromRGBA(imgData[0],imgData[1],imgData[2],imgData[3]);

		// clear triangle canvas
		this.canvasTriangle.clearAll();
		this.ang = Math.atan2(this.cursor.center.y - this.center.y, this.cursor.center.x - this.center.x) * (180 / Math.PI);
		this.triangle.rotateTo(this.ang);

		let ang = 180;
		const coor = {
			x: Math.cos(toRadians(this.ang + ang)) * this.triangle.radius + this.triangle.center.x,
			y: Math.sin(toRadians(this.ang + ang)) * this.triangle.radius + this.triangle.center.y
		};
		
		const pts = [...this.triangle.points,coor];

		// gradient 1 = black => white
		const g1 = this.canvasTriangle.createLinearGradient(pts[1], pts[2]);
		g1.addColorStop(0, 'hsl(' + this.color.h + ',0%,100%)');
		g1.addColorStop(1, 'hsl(' + this.color.h + ',0%,0%)');

		// gradient 2 = hue => transparent
		const g2 = this.canvasTriangle.createLinearGradient(pts[0], pts[3]);
		g2.addColorStop(0, this.color.cssRGB());
		g2.addColorStop(1, this.color.cssRGBA() );
		// draw
		this.triangle.draw(this.canvasTriangle.ctx, g2);
		this.triangle.draw(this.canvasTriangle.ctx, g1);
	}

	drawCursor() {
		// clear dot canvas
		this.canvasDot.clearAll();		
		this.cursor.moveTo(this.cursor.center);
		this.cursor.draw(this.canvasDot.ctx,{
			stroke: '#fff',
			lineWidth: 2,
			fill: this.color.cssRGBA()
		});
	}

	setEvents() {
		let self = this;
		this.canvasDot.canvas.addEventListener('mousedown', e => {
			self.setActive(true);
			if (self.active)
				self.update(e);
		}, false);
		this.canvasDot.canvas.addEventListener('mouseup', () => {
			self.setActive(false);
		}, false);
		this.canvasDot.canvas.addEventListener('mousemove', e => {
			if (self.active)
				self.update(e);
		}, false);
		this.drawCursor(0, 0, false);
	}
}

window.customElements.define('color-picker', ColorPicker);