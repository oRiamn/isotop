
import { mod } from '@lib/collision.js';

export default class Point {
	constructor(x, y) {
		this.x=x;
		this.y=y;
	}
	rotateTo(angle, center) {
		angle = mod(angle, Math.PI*2);
		const sin =  Math.sin(angle),
			cos = Math.cos(angle);		
		
		const deltaX = this.x - center.x,
			deltaY = this.y - center.y;
	
		this.moveTo(
			(deltaX * cos) - (deltaY * sin) + center.x ,
			(deltaX * sin) + (deltaY * cos) + center.y
		);
	}	

	moveTo(x,y){
		this.x=x;
		this.y=y;
	}

	calculateAngle(point) {
		const angle =  Math.atan2(this.y - point.y, this.x - point.x) + Math.PI;
		return angle === 2*Math.PI ? 0 : angle;
	}

	calculateDistance(point) {
		return Math.sqrt( Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2) );
	}
}