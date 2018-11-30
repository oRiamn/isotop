import { Circle } from './Circle';
export const Ring = class extends Circle {
	constructor(center, radius, weight) {
		super(center, radius);
		this.weight = weight;
		this.build();
	}
	draw(ctx, style, start, end) {
		super.draw(ctx, style, start, end);
		if (style.stroke) {
			ctx.strokeStyle = style.stroke;
			ctx.stroke();
		}
		if (style.lineWidth) {
			ctx.lineWidth = style.lineWidth;
		}
	}
	build() {
		this.radLarge = this.radius;
		this.radSmall = this.radius - this.weight;
	}
	collisionPoint(point) {
		const distance = this.center.calculateDistance(point);
		return (distance < this.radLarge) && (distance > this.radSmall);
	}
};