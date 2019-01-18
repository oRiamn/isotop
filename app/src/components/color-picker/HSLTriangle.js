import { EquilateralTriangle } from '@src/library/figure/EquilateralTriangle';
import { Point } from '@src/library/figure/Point';

export const HSLTriangle = class extends EquilateralTriangle {

	constructor(center, radius, angle, canvas) {
		super(center, radius, angle);

		this.canvas = canvas;

		this.hPoint = this.points[0];
		this.vPoint = this.points[1];
		this.sPoint = this.points[2];

		this.svPoint = new Point(0,0);
		this.hsPoint = new Point(0,0);

		this.ctx = canvas.ctx;
		this.ctx.globalCompositeOperation = 'lighter';
	}

	draw(color) {

		const h = Math.round(360 * color.hsl.h);

		const size = this.canvas.canvas.width,
			ctx = this.ctx;

		// clear
		ctx.clearRect(0, 0, size, size);
		ctx.save();
		this.drawPath();


		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, size, size);
		// => black triangle

		this.svPoint.moveTo(
			Math.round((this.sPoint.x + this.vPoint.x) / 2),
			Math.round((this.sPoint.y + this.vPoint.y) / 2)
		);

		// create gradient from hsl(hue, 1, 1) to transparent
		var grad0 = this.canvas.createLinearGradient(this.hPoint, this.svPoint);
		grad0.addColorStop(0, `hsla(${h}, 100%, 50%, 1)`);
		grad0.addColorStop(1, `hsla(${h}, 100%, 50%, 0)`);
		ctx.fillStyle = grad0;
		ctx.fillRect(0,0, size, size);

		// => gradient: one side of the triangle is black, the opponent angle is $color

		this.hsPoint.moveTo(
			Math.round((this.hPoint.x + this.sPoint.x) / 2),
			Math.round((this.hPoint.y + this.sPoint.y) / 2)
		);

		// create color gradient from white to transparent
		var grad1 = this.canvas.createLinearGradient(this.vPoint, this.hsPoint);
		grad1.addColorStop(0, '#fff');
		grad1.addColorStop(1, 'rgba(255, 255, 255, 0)');
		ctx.fillStyle = grad1;
		ctx.fillRect(0, 0, size, size);
		// => white angle

		ctx.restore();
	}

	drawPath() {
		this.ctx.beginPath();
		this.ctx.moveTo(this.points[0].x, this.points[0].y);
		for (let i = 1; i < this.points.length; i++) {
			this.ctx.lineTo(this.points[i].x, this.points[i].y);
		}
		this.ctx.closePath();
		this.ctx.clip();
	}


};