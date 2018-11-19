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
		ctx.moveTo(this.prev.x, this.prev.y);
		ctx.lineTo(this.center.x, this.center.y);
		ctx.lineWidth = 20;
		ctx.lineCap = 'round';
		ctx.strokeStyle = '#000';
		ctx.stroke();
	}
};