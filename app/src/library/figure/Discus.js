import { Circle } from './Circle';
export const Discus = class extends Circle {
	constructor(center, radius) {
		super(center, radius);
	}
	collisionPoint(point) {
		return this.center.calculateDistance(point) <= this.radius;
	}
};