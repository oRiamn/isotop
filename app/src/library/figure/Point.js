export const Point = class {
	constructor(x, y) {
		this.x=x;
		this.y=y;
	}

	moveTo(x,y){
		this.x=x;
		this.y=y;
	}

	calculateDistance(point) {
		return Math.sqrt( Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y) );
	}
};