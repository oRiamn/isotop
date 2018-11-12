import { Point } from './Point';

export const Circle = class {
    
	constructor(center, radius, weight) {
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


export const Ring = class extends Circle {
	
	constructor(center, radius, weight) {
		super(center, radius);
		this.weight=weight;
		
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

	build(){
		this.radLarge=this.radius;
		this.radSmall=this.radius-this.weight;
	}

	collisionPoint(point){
		const distance = this.center.calculateDistance(point);	
		return (distance < this.radLarge)  && (distance > this.radSmall);
	}
};

export const Discus = class extends Circle {
	
	constructor(center, radius) {
		super(center, radius);		
	}

	collisionPoint(point){		
		return this.center.calculateDistance(point) < this.radius;
	}
};