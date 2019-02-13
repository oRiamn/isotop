import Point from './Point';

const collisions = {
	withPoint: (circle, point) => {		
		return circle.center.calculateDistance(point) === circle.radius;
	}
};

export default class Circle {
    
	constructor(center, radius) {
		this.center = center;
		this.radius = radius;
	}

	collision(figure){
		let collision = false;

		if(figure instanceof Point) {
			collision = collisions.withPoint(this,figure);
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
}