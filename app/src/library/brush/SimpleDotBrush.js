import { Point } from '../figure/Point';
import { Brush } from './Brush';

export const SimpleDotBrush = class extends Brush {

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