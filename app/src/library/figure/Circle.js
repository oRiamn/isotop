import { Point } from './Point';

export const Circle = class {
    
	constructor(center, radius) {
		this.center = center;
		this.radius = radius;
	}

	moveTo(point){
		this.center.x = point.x;
		this.center.y = point.y;
	}

	collision(figure){
		let collision = false;

		if(figure instanceof Point) {
			collision = this.collisionPoint(figure);
		}
		
		return collision;
	}

	draw(ctx, style, start, end) {
		ctx.beginPath();
		ctx.arc(this.center.x, this.center.y, this.radius, start || 0, end || Math.PI * 2);
		if (style.fill) {
			ctx.fillStyle = style.fill;
			ctx.fill();
		}
	}


	collisionPoint(point){		
		return this.center.calculateDistance(point) === this.radius;
	}
};