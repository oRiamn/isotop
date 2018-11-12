import { Point } from './Point';

export const Circle = class {
    
	constructor(center, radius, weight) {
		this.center= center;
		this.radius=radius;
	}

	collision(figure){
		let collision = false;

		if(figure instanceof Point) {
			collision = this.collisionPoint(figure);
		}
		
		return collision;
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