import { EquilateralTriangle } from '@src/library/figure/EquilateralTriangle';
import { Point } from '@src/library/figure/Point';

export const HSLTriangle = class extends EquilateralTriangle {

	constructor(center, radius, angle, canvas) {
		super(center, radius, angle);

		this.canvas = canvas;

		this.hPoint = this.points[0];
		this.vPoint = this.points[1];
		this.sPoint = this.points[2];

		this.svPoint = new Point(
			Math.round((this.sPoint.x + this.vPoint.x) / 2),
			Math.round((this.sPoint.y + this.vPoint.y) / 2)
		);
		this.hsPoint = new Point(
			Math.round((this.hPoint.x + this.sPoint.x) / 2),
			Math.round((this.hPoint.y + this.sPoint.y) / 2)
		);

		this.ctx = canvas.ctx;
		this.ctx.globalCompositeOperation = 'lighter';
	}

	rotateTo(angle){
		super.rotateTo(angle);

		this.svPoint.moveTo(
			Math.round((this.sPoint.x + this.vPoint.x) / 2),
			Math.round((this.sPoint.y + this.vPoint.y) / 2)
		);

		this.hsPoint.moveTo(
			Math.round((this.hPoint.x + this.sPoint.x) / 2),
			Math.round((this.hPoint.y + this.sPoint.y) / 2)
		);
	}

	draw(color) {

		const h = Math.round(360 * color.hsl.h);

		// clear
		this.canvas.clearAll();
		this.canvas.ctx.save();
		this.drawPath();

		this.canvas.setFillStyle('rgba(0, 0, 0, 1)');
		this.canvas.fillAll();

		// gradient from hsl(hue, 1, 1) to transparent
		var hueToTransparent = this.canvas.createLinearGradient(this.hPoint, this.svPoint);
		hueToTransparent.addColorStop(0, `hsla(${h}, 100%, 50%, 1)`);
		hueToTransparent.addColorStop(1, `hsla(${h}, 100%, 50%, 0)`);
		this.canvas.setFillStyle(hueToTransparent);
		this.canvas.fillAll();

		// gradient from white to transparent
		var whiteTotransparent = this.canvas.createLinearGradient(this.vPoint, this.hsPoint);
		whiteTotransparent.addColorStop(0, 'rgba(255, 255, 255, 1)');
		whiteTotransparent.addColorStop(1, 'rgba(255, 255, 255, 0)');
		this.canvas.setFillStyle(whiteTotransparent);
		this.canvas.fillAll();

		this.canvas.ctx.restore();
	}

	drawPath() {
		this.canvas.ctx.beginPath();
		this.canvas.ctx.moveTo(this.points[0].x, this.points[0].y);
		for (let i = 1; i < this.points.length; i++) {
			this.canvas.ctx.lineTo(this.points[i].x, this.points[i].y);
		}
		this.canvas.ctx.closePath();
		this.canvas.ctx.clip();
	}


};