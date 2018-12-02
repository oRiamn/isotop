import { Point } from './Point';
import { degreeToRadians } from '@lib/collision.js';
import { Triangle } from './Triangle';
export const EquilateralTriangle = class extends Triangle {
	constructor(center, radius, angle) {
		super(new Point(0, 0), new Point(0, 0), new Point(0, 0), angle);
		this.radius = radius;
		this.center = center;
		this.calculatePositions();
	}
	
	rotateTo(angle) {
		this.angle = angle;
		this.calculatePositions();
	}
	calculatePositions() {
		const angs = [
			0,
			120,
			240
		];

		for (let i = 0; i < angs.length; i++) {
			this.points[i].x = Math.cos(degreeToRadians(this.angle + angs[i])) * this.radius + this.center.x;
			this.points[i].y = Math.sin(degreeToRadians(this.angle + angs[i])) * this.radius + this.center.y;
		}
	}
};