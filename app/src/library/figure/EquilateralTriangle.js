import Point from './Point';
import Triangle from './Triangle';

import { degreeToRadians } from '@lib/collision.js';

function buildPosition(triangle) {
	const angs = [0,120,240];
	for (let i = 0; i < angs.length; i++) {
		const angle = triangle.angle + degreeToRadians(angs[i]);
		triangle.points[i].moveTo(
			Math.cos(angle) * triangle.radius + triangle.center.x,
			Math.sin(angle) * triangle.radius + triangle.center.y
		);
	}
}

export default class EquilateralTriangle extends Triangle {
	constructor(center, radius, angle) {
		super(new Point(0, 0), new Point(0, 0), new Point(0, 0), angle);
		this.radius = radius;
		this.center = center;

		buildPosition(this);
	}
}