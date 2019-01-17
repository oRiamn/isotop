import { EquilateralTriangle } from '@src/library/figure/EquilateralTriangle';

export const HSLTriangle = class extends EquilateralTriangle {

	constructor(center, radius, angle, canvas) {
		super(center, radius, angle);

		this.canvas = canvas;

		this.hPoint = this.points[0];
		this.vPoint = this.points[1];
		this.sPoint = this.points[2];

		this.canvas.ctx.globalCompositeOperation = 'hard-light';
	}

	draw(color) {

		const h = Math.round(360 * color.hsl.h);

		const hx = this.hPoint.x,
			hy = this.hPoint.y,
			sx = this.sPoint.x,
			sy = this.sPoint.y,
			vx = this.vPoint.x,
			vy = this.vPoint.y,
			size = this.canvas.canvas.width,
			ctx = this.canvas.ctx;

		// clear
		ctx.clearRect(0, 0, size, size);

		ctx.save();

		// make a triangle
		ctx.beginPath();
		ctx.moveTo(hx, hy);
		ctx.lineTo(sx, sy);
		ctx.lineTo(vx, vy);
		ctx.closePath();
		ctx.clip();

		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, size, size);
		// => black triangle

		// create gradient from hsl(hue, 1, 1) to transparent
		var grad0 = ctx.createLinearGradient(hx, hy, (sx + vx) / 2, (sy + vy) / 2);
		var hsla = 'hsla(' + Math.round(h * (180 / Math.PI)) + ', 100%, 50%, ';
		grad0.addColorStop(0, hsla + '1)');
		grad0.addColorStop(1, hsla + '0)');
		ctx.fillStyle = grad0;
		ctx.fillRect(0,0, size, size);
		// => gradient: one side of the triangle is black, the opponent angle is $color

		// create color gradient from white to transparent
		var grad1 = ctx.createLinearGradient(vx, vy, (hx + sx) / 2, (hy + sy) / 2);
		grad1.addColorStop(0, '#fff');
		grad1.addColorStop(1, 'rgba(255, 255, 255, 0)');
		ctx.globalCompositeOperation = 'lighter';
		ctx.fillStyle = grad1;
		ctx.fillRect(0, 0, size, size);
		// => white angle

		ctx.restore();
	}

	drawPath(ctx, fill) {
		ctx.beginPath();
		ctx.moveTo(this.points[0].x, this.points[0].y);
		for (let i = 0; i < this.points.length; i++) {
			ctx.lineTo(this.points[i].x, this.points[i].y);
		}
		ctx.fillStyle = fill;
		ctx.fill();
	}


};