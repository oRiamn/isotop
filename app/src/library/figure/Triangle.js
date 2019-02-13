import Point  from './Point';
import { mod } from '@lib/collision.js';

function calculateCenter(triangle) {
	let xSum=0;
	let ySum=0;

	triangle.points.map(point => {
		xSum+=point.x;
		ySum+=point.y;
	});

	return new Point(xSum/3, ySum/3);
}

const collisions = {
	withPoint: (triangle, point) => {
		const p0 = triangle.points[0], 
			p1 = triangle.points[1],
			p2 = triangle.points[2];
	
		const A = 1 / 2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
		const sign = A < 0 ? -1 : 1;
		const s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * point.x + (p0.x - p2.x) * point.y) * sign;
		const t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * point.x + (p1.x - p0.x) * point.y) * sign;
		return s > 0 && t > 0 && (s + t) < 2 * A * sign;
	}
};

export default class Triangle {
    
	constructor(p1,p2,p3, angle) {
		this.points=[
			p1,
			p2,
			p3,
		];
		this.angle = angle || 0;
		this.center = calculateCenter(this);
	}
	
	collision(figure){
		let collision = false;

		if(figure instanceof Point) {
			collision = collisions.withPoint(this,figure);
		}
		
		return collision;
	}

	rotateTo(newAngle) {
		newAngle = mod(newAngle, Math.PI*2);
		const deltaAngle = newAngle -this.angle;
		this.angle=newAngle;
		const sin =  Math.sin(deltaAngle),
			cos = Math.cos(deltaAngle);		
		for (let i = 0; i < this.points.length; i++) {			
			const deltaX = this.points[i].x - this.center.x,
				deltaY = this.points[i].y - this.center.y;
	
			this.points[i].moveTo(
				(deltaX * cos) - (deltaY * sin) + this.center.x ,
				(deltaX * sin) + (deltaY * cos) + this.center.y
			);
		}
	}	
}