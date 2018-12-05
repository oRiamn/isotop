export const Point = class {
	constructor(x, y) {
		this.x=x;
		this.y=y;
	}

	moveTo(x,y){
		this.x=x;
		this.y=y;
	}

	calculateAngle(point) {
		return Math.atan2(this.y - point.y, this.x - point.x);
	}

	calculateDistance(point) {
		return Math.sqrt( Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2) );
	}
};