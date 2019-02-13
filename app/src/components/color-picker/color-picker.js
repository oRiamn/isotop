require('./color-picker.scss');
import html from './color-picker.pug';

import { degreeToRadians, PIx2, SQRT3 } from '@lib/collision.js';
import Point from '@lib/figure/Point';
import Ring from '@lib/figure/Ring';
import Canvas2d from '@src/library/Canvas2d';
import Circle from '@lib/figure/Circle';
import CssColor from '@src/library/color/CssColor';
import HSLTriangle from './HSLTriangle';

window.customElements.define('color-picker', class extends HTMLElement {

	constructor() {
		super();
		this.innerHTML = html;
		
		let size=250;

		// canvas setup
		this.width = size;
		this.height = size;
		
		// event variables
		this.active = false;
		this.color = new CssColor();
		this.cursor = new Ring(new Point(-20000,-20000),3, 2);

		// segment construction
		let segmentPoints=20;
		this.segment={
			points: segmentPoints,
			angle: 360 / segmentPoints,
			arc: PIx2 / segmentPoints
		};

		this.style.width = `${this.width}px`;
		this.style.height = `${this.width}px`;

		this.center = new Point(this.width / 2,this.height / 2);
		this.ring = new Ring(this.center,(this.width / 2) - 5, 5);

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

		this.triangle = new HSLTriangle(this.center,this.ring.radSmall-5, 0, this.canvasTriangle);

		this.canvasDot = new Canvas2d(
			this.querySelector('.dot'), {
				width: this.width, 
				height: this.height
			}
		);

		this.drawRing();
		this.triangle.draw(this.color);

		// add events
		this.setEvents();
	}
	
	setCursorColor(color) {
		const circ = PIx2*this.ring.radius,
			d = circ - color.hsv.h*circ,
			teta = d/this.ring.radius;

		const c = this.triangle.center,
			r = this.triangle.radius,
			v = color.hsv.v,
			s = color.hsv.s;

		const x = c.x + r*(2*v - s*v - 1)*SQRT3/2,
			y = c.y + r*(1 - 3*s*v)/ 2;

		this.cursor.center.moveTo(x,y);		

		this.cursor.center.rotateTo(PIx2-(teta-Math.PI/2), this.triangle.center);
		this.triangle.rotateTo(PIx2-teta);

		this.triangle.draw(color);

		const imgData = this.canvasTriangle.getImageData(this.cursor.center, 1, 1).data;
		this.color.fromRGBA(imgData[0],imgData[1],imgData[2]);
		
		this.drawCursor();
		this.onchange();
	}

	onchange() {

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
			
			const aRad = degreeToRadians(a),
				bRad = degreeToRadians(b);
			

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

				const imgData = this.canvasRing.getImageData(this.cursor.center, 1, 1).data;
				this.color.fromRGBA(imgData[0],imgData[1],imgData[2]);

				const angle = this.triangle.center.calculateAngle(this.cursor.center);
				this.triangle.rotateTo(angle);
				this.triangle.draw(this.color);
				this.drawCursor();
				this.onchange();	
			}
			else if (this.triangle.collision(this.cursor.center)) {
				const imgData = this.canvasTriangle.getImageData(this.cursor.center, 1, 1).data;
				this.color.fromRGBA(imgData[0],imgData[1],imgData[2]);
				
				this.drawCursor();
				this.onchange();	
			}
		}
	}
	
	drawCursor() {
		// clear dot canvas
		this.canvasDot.clearAll();
		this.cursor.draw(this.canvasDot.ctx,{
			stroke: '#fff',
			lineWidth: 2,
			fill: this.color.toRGBA()
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
	}
});