import { Point } from './Point';

export const Circle = class {
    
	constructor(center, radius, weight) {
		this.center= center;
		this.radius=radius;
		this.weight=weight;
		
		this.build();
	}

	collision(figure){
		let collision = false;

		if(figure instanceof Point) {
			const distance = this.center.calculateDistance(figure);			
			collision = (distance < this.radLarge)  && (distance > this.radSmall);
		}
		
		return collision;
	}

	build(){
		this.radLarge=this.radius;
		this.radSmall=this.radius-this.weight;
	}
};