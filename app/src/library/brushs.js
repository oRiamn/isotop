import { Point } from './figure/Point';

export const Brush = class {
    
	constructor(center, color, width) {
		this.prev = new Point(center.x, center.y);
		this.center = center;
		this.width=width*2;
		this.color=color;
	}

	moveTo(x, y) {
		this.prev.moveTo(this.center.x, this.center.y);
		this.center.moveTo(x,y);
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.moveTo(this.prev.x, this.prev.y);
		ctx.lineTo(this.center.x, this.center.y);
		ctx.lineWidth = this.width;
		ctx.lineCap = 'round';
		ctx.strokeStyle = this.color.cssRGBA();
		ctx.stroke();
	}
};