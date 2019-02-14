import Circle from './Circle';
import Point from './Point';



function buildRing(ring) {
	ring.radLarge = ring.radius;
	ring.radSmall = ring.radius - ring.weight;
}

const collisions = {
	withPoint: function (ring, point){
		const distance = ring.center.calculateDistance(point);
		return (distance < ring.radLarge) && (distance > ring.radSmall);
	}
};

export default class Ring extends Circle {
	
	constructor(center, radius, weight) {
		super(center, radius);
		this.weight = weight;
		this.radLarge=0;
		this.radSmall=0;
		buildRing(this);
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

	collision(figure){
		let collision = false;

		if(figure instanceof Point) {
			collision = collisions.withPoint(this,figure);
		}
		
		return collision;
	}
}