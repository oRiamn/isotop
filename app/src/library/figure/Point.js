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
		const angle =  Math.atan2(this.y - point.y, this.x - point.x) + Math.PI;
		return angle === 2*Math.PI ? 0 : angle;
	}

	calculateDistance(point) {
		return Math.sqrt( Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2) );
	}
};