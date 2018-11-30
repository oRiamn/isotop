import { Point }  from './Point';

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