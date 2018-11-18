import { Point } from './figure/Point';

export const Brush = class {
    
	constructor(center) {
		this.prev = new Point(center.x, center.y);
		this.center = center;
	}

	moveTo(x, y) {
		this.prev.moveTo(this.center.x, this.center.y);
		this.center.moveTo(x,y);
	}

	draw(ctx) {
		
		ctx.beginPath();
		ctx.arc(this.center.x, this.center.y, 10, 0, 2 * Math.PI, true);
		ctx.fill();
		ctx.stroke();
	}
};