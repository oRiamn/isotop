import Point from './Point';
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
		const angs = [0, 120, 240, 180],
			pts = [];
		for (let i = 0; i < angs.length; i++) {
			const x = Math.cos(toRadians(angle + angs[i])) * radius + center.x,
				y = Math.sin(toRadians(angle + angs[i])) * radius + center.y;

			pts.push(new Point(x, y));
		}

		super(pts[0],pts[1],pts[2], angle);
	}

	rotateTo(angle){

	}
};