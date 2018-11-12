import { Point }  from './Point';
import { toRadians } from '@lib/collision.js';

export const Triangle = class {
    
	constructor(p1,p2,p3, angle) {
		this.points=[
			p1,
			p2,
			p3,
		];
		this.angle = angle || 0;
		this.center = this.calculateCenter();
	}

	draw(ctx, fill) {
		ctx.beginPath();
		ctx.moveTo(this.points[0].x, this.points[0].y);
		for (let i = 0; i < this.points.length; i++) {
			ctx.lineTo(this.points[i].x, this.points[i].y);
		}
		ctx.fillStyle = fill;
		ctx.fill();
	}

	collision(figure){
		let collision = false;

		if(figure instanceof Point) {
			collision = this.collisionPoint(figure);
		}
		
		return collision;
	}

	collisionPoint(point) {
		const p0 = this.points[0], 
			p1 = this.points[1],
			p2 = this.points[2];

		const A = 1 / 2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
		const sign = A < 0 ? -1 : 1;
		const s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * point.x + (p0.x - p2.x) * point.y) * sign;
		const t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * point.x + (p1.x - p0.x) * point.y) * sign;
		return s > 0 && t > 0 && (s + t) < 2 * A * sign;
	}

	calculateCenter(){
		let xSum=0;
		let ySum=0;

		this.points.map(point => {
			xSum+=point.x;
			ySum+=point.y;
		});

		return new Point(xSum/3, ySum/3);
	}
};

export const EquilateralTriangle = class extends Triangle {
	constructor(center, radius, angle) {
		super(new Point(0,0),new Point(0,0),new Point(0,0), angle);
		this.radius=radius;
		this.center=center;
		this.calculatePositions();
	}

	rotateTo(angle){
		this.angle=angle;
		this.calculatePositions();
	}

	calculatePositions(){
		const angs = [0, 120, 240];
		for (let i = 0; i < angs.length; i++) {
			this.points[i].x = Math.cos(toRadians(this.angle + angs[i])) * this.radius + this.center.x;
			this.points[i].y = Math.sin(toRadians(this.angle + angs[i])) * this.radius + this.center.y;
		}
	}

	
};