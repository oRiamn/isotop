import css from './color-picker.scss';
import html from './color-picker.pug';

import { rgbToHsl } from '@lib/color-picker';
import { toRadians, inCircle, inTriangle } from '@lib/collision.js';
import { Point } from '@lib/figure/Point';
import { Ring } from '@lib/figure/Circle';
import { EquilateralTriangle } from '@lib/figure/Triangle';

export default class ColorPicker extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = html;
		let size=150;

		// canvas setup
		this.width = size;
		this.height = size;

		this.center = new Point(this.width / 2,this.height / 2);
		this.ring = new Ring(this.center,(size / 2), 20);
		this.triangle = new EquilateralTriangle(this.center,this.ring.radSmall, 0);

		
		// event variables
		this.active = false;
		this.color = null;
		this.pos = null;

		// segment construction
		let segmentPoints=200;
		this.segment={
			points: segmentPoints,
			angle: 360 / segmentPoints,
			arc: Math.PI * 2 / segmentPoints
		};
		
		
		
		this.tri=[];
		// create
		this.init();
	}

	init() {
		// outer canvas
		this.outer = this.querySelector('.outer');
		this.outer.width=this.width;
		this.outer.height=this.height;
		this.ctxA = this.outer.getContext('2d');
		// inner canvas
		this.inner = this.querySelector('.inner');
		this.inner.width=this.width;
		this.inner.height=this.height;
		this.ctxB = this.inner.getContext('2d');
		this.ctxB.globalCompositeOperation = 'hard-light';
		// dot canvas
		this.dot = this.querySelector('.dot');
		this.dot.width=this.width;
		this.dot.height=this.height;
		this.ctxC = this.dot.getContext('2d');

		// add spectrum
		this.spectrum();
		// add events
		this.setEvents();
	}

	drawCircle(ctx, x, y, r, style, start, end) {
		ctx.beginPath();
		ctx.arc(x, y, r, start || 0, end || Math.PI * 2);
		if (style.fill) {
			ctx.fillStyle = style.fill;
			ctx.fill();
		}
		if (style.stroke) {
			ctx.strokeStyle = style.stroke;
			ctx.stroke();
		}
		if (style.lineWidth) {
			ctx.lineWidth = style.lineWidth;
		}
	}

	drawTriangle(ctx, points, fill) {
		ctx.beginPath();
		ctx.moveTo(points[0].x, points[0].y);
		for (let i = points.length - 2; i >= 0; i--) {
			ctx.lineTo(points[i].x, points[i].y);
		}
		ctx.fillStyle = fill;
		ctx.fill();
	}

	spectrum() {
		for (let i = 1; i <= this.segment.points; i++) {
			
			// arc points
			let a = i * this.segment.angle;
			let b = (i - 1) * this.segment.angle;
			
			// gradient vector
			let radius = this.ring.radSmall + (this.ring.radLarge - this.ring.radSmall) / 2;
			let x1 = Math.cos(toRadians(a)) * radius + this.center.x;
			let y1 = Math.sin(toRadians(a)) * radius + this.center.y;
			let x2 = Math.cos(toRadians(b)) * radius + this.center.x;
			let y2 = Math.sin(toRadians(b)) * radius + this.center.y;
			
			// gradient
			let g = this.ctxA.createLinearGradient(x1, y1, x2, y2);
			g.addColorStop(0, 'hsl( ' + a + ', 100%, 50%)');
			g.addColorStop(1, 'hsl( ' + b + ', 100%, 50%)');
			
			// draw arc
			let o = 0.001;
			this.ctxA.beginPath();
			this.ctxA.arc(this.center.x, this.center.y, this.ring.radLarge, toRadians(b) - o, toRadians(a) + o, false);
			this.ctxA.arc(this.center.x, this.center.y, this.ring.radSmall, toRadians(a) + o, toRadians(b) - o, true);
			this.ctxA.fillStyle = g;
			this.ctxA.fill();
		}
	}

	update(e, cw) {
		// get mouse pos
		let x = e.clientX - cw.inner.offsetLeft;
		let y = e.clientY - cw.inner.offsetTop;

		this.pos = new Point(x,y);
		// check mouse is within bounds
		let outer = inCircle(cw.center.x, cw.center.y, x, y, cw.ring.radLarge), 
			inner = inCircle(cw.center.x, cw.center.y, x, y, cw.ring.radSmall), tri;

		let collision = this.ring.collision(this.pos);
		
		// check mouse in triangle
		if (this.tri) {
			tri = inTriangle(this.pos, this.tri[0], this.tri[1], this.tri[2]);
		}
		// draw
		if (outer && !inner) {
			cw.draw(x, y, false);
		}
		else if (tri) {
			cw.draw(x, y, true);
		}
	}
	draw(x, y, tri) {
		// get pixel data
		let da = this.ctxA.getImageData(x, y, 1, 1).data;
		let db = this.ctxB.getImageData(x, y, 1, 1).data;
		// draw equilateral triangle
		if (!tri) {
			// clear triangle canvas
			this.ctxB.clearRect(0, 0, this.inner.width, this.inner.height);
			this.ang = Math.atan2(y - this.center.y, x - this.center.x) * (180 / Math.PI);
			this.triangle.rotateTo(this.ang);

			this.color = 'rgb(' + da[0] + ',' + da[1] + ',' + da[2] + ')';
			let ang = 180;
			const coor = {
				x: Math.cos(toRadians(this.ang + ang)) * this.triangle.radius + this.triangle.center.x,
				y: Math.sin(toRadians(this.ang + ang)) * this.triangle.radius + this.triangle.center.y
			};

			
			let pts = this.tri = [...this.triangle.points,coor];
			
			// gradient 1 = black => white
			let g1 = this.ctxB.createLinearGradient(pts[1].x, pts[1].y, pts[2].x, pts[2].y);
			let hsl = rgbToHsl(da[0], da[1], da[2]);
			g1.addColorStop(0, 'hsl(' + hsl[0] * 360 + ',0%,100%)');
			g1.addColorStop(1, 'hsl(' + hsl[0] * 360 + ',0%,0%)');
			// gradient 2 = hue => transparent
			let g2 = this.ctxB.createLinearGradient(pts[0].x, pts[0].y, pts[3].x, pts[3].y);
			g2.addColorStop(0, this.color);
			g2.addColorStop(1, 'rgba(' + da[0] + ',' + da[1] + ',' + da[2] + ', 0)');
			// draw
			this.drawTriangle(this.ctxB, pts, g2);
			this.drawTriangle(this.ctxB, pts, g1);
		}
		// clear dot canvas
		this.ctxC.clearRect(0, 0, this.dot.width, this.dot.height);
		let choice = tri ? db : da;
		this.dotCol = 'rgba(' + choice[0] + ',' + choice[1] + ',' + choice[2] + ',' + choice[3] + ')';
		let s = {
			stroke: '#fff',
			lineWidth: 2,
			fill: this.dotCol
		};
		this.drawCircle(this.ctxC, x, y, 3, s);
		// TESTING - update view background
		this.style.background = this.dotCol;
	}
	setEvents() {
		let self = this;
		this.dot.addEventListener('mousedown', e => {
			self.active = true;
			if (self.active)
				self.update(e, self);
		}, false);
		this.dot.addEventListener('mouseup', () => {
			self.active = false;
		}, false);
		this.dot.addEventListener('mousemove', e => {
			if (self.active)
				self.update(e, self);
		}, false);
		this.draw(230, 30, false);
	}
}

window.customElements.define('color-picker', ColorPicker);