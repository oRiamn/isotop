import css from './color-picker.scss';
import html from './color-picker.pug';

import { rgbToHsl } from '@lib/color-picker';
import { toRadians } from '@lib/collision.js';
import { Point } from '@lib/figure/Point';
import { Ring } from '@lib/figure/Circle';
import { EquilateralTriangle } from '@lib/figure/Triangle';
import { Canvas2d } from '../../library/Canvas';
import { Circle } from '../../library/figure/Circle';
import { Square } from '../../library/figure/Square';

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
		this.cursorDot = new Ring(new Point(0,0),3, 2);

		
		// event variables
		this.active = false;
		this.color = null;
		this.pos = new Point(-20000,-20000);

		// segment construction
		let segmentPoints=200;
		this.segment={
			points: segmentPoints,
			angle: 360 / segmentPoints,
			arc: Math.PI * 2 / segmentPoints
		};

		// create
		this.init();
	}

	init() {
		// outer canvas
		this.canvasRing = new Canvas2d(
			this.querySelector('.outer'), {
				width: this.width, 
				height: this.height
			}
		);

		// inner canvas
		this.canvasTriangle = new Canvas2d(
			this.querySelector('.inner'), {
				width: this.width, 
				height: this.height
			}
		);
		this.canvasTriangle.ctx.globalCompositeOperation = 'hard-light';

		// dot canvas
		this.dot = this.querySelector('.dot');
		this.dot.width=this.width;
		this.dot.height=this.height;
		this.ctxC = this.dot.getContext('2d');

		this.canvasDot = new Canvas2d(
			this.querySelector('.dot'), {
				width: this.width, 
				height: this.height
			}
		);

		// add spectrum
		this.spectrum();
		// add events
		this.setEvents();
	}

	spectrum() {

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
		// get mouse pos
		const x = e.clientX - this.offsetLeft,
			y = e.clientY - this.offsetTop;

		this.pos.moveTo(x,y);
		
		// draw
		if (this.ring.collision(this.pos)) {
			this.draw(false);
		}
		else if (this.triangle.collision(this.pos)) {
			this.draw(true);
		}
	}
	drawTriangle(pixelData) {
		// clear triangle canvas
		this.canvasTriangle.clearAll();
		this.ang = Math.atan2(this.pos.y - this.center.y, this.pos.x - this.center.x) * (180 / Math.PI);
		this.triangle.rotateTo(this.ang);

		this.color = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] + ')';
		let ang = 180;
		const coor = {
			x: Math.cos(toRadians(this.ang + ang)) * this.triangle.radius + this.triangle.center.x,
			y: Math.sin(toRadians(this.ang + ang)) * this.triangle.radius + this.triangle.center.y
		};

		
		const pts = [...this.triangle.points,coor];

		// gradient 1 = black => white
		const g1 = this.canvasTriangle.createLinearGradient(pts[1], pts[2]);
		let hsl = rgbToHsl(pixelData[0], pixelData[1], pixelData[2]);
		g1.addColorStop(0, 'hsl(' + hsl[0] * 360 + ',0%,100%)');
		g1.addColorStop(1, 'hsl(' + hsl[0] * 360 + ',0%,0%)');
		// gradient 2 = hue => transparent
		const g2 = this.canvasTriangle.createLinearGradient(pts[0], pts[3]);
		g2.addColorStop(0, this.color);
		g2.addColorStop(1, 'rgba(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] + ', 0)');
		// draw
		this.triangle.draw(this.canvasTriangle.ctx, g2);
		this.triangle.draw(this.canvasTriangle.ctx, g1);
	}
	draw(tri) {
		// get pixel data
		let da = this.canvasRing.getImageData(this.pos, 1, 1).data;
		let db = this.canvasTriangle.getImageData(this.pos, 1, 1).data;
		
		// draw equilateral triangle
		if (!tri) {
			this.drawTriangle(da);
		}

		// clear dot canvas
		this.canvasDot.clearAll();
		let choice = tri ? db : da;
		this.dotCol = 'rgba(' + choice[0] + ',' + choice[1] + ',' + choice[2] + ',' + choice[3] + ')';
		let s = {
			stroke: '#fff',
			lineWidth: 2,
			fill: this.dotCol
		};

		this.cursorDot.moveTo(this.pos);
		this.cursorDot.draw(this.canvasDot.ctx, s);
		// TESTING - update view background
		this.style.background = this.dotCol;
	}
	setEvents() {
		let self = this;
		this.dot.addEventListener('mousedown', e => {
			self.active = true;
			if (self.active)
				self.update(e);
		}, false);
		this.dot.addEventListener('mouseup', () => {
			self.active = false;
		}, false);
		this.dot.addEventListener('mousemove', e => {
			if (self.active)
				self.update(e);
		}, false);
		this.draw(0, 0, false);
	}
}

window.customElements.define('color-picker', ColorPicker);