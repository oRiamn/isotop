import { EquilateralTriangle } from '@src/library/figure/EquilateralTriangle';

export const HSLTriangle = class extends EquilateralTriangle {

	constructor(center, radius, angle, canvas) {
		super(center, radius, angle);

		this.canvas = canvas;
		this.canvas.ctx.globalCompositeOperation = 'hard-light';
	}

	draw(color) {

		// clear triangle canvas
		this.canvas.clearAll();

		const coor = {
				x: Math.round(Math.cos((this.angle + Math.PI)) * this.radius + this.center.x),
				y: Math.round(Math.sin((this.angle + Math.PI)) * this.radius + this.center.y)
			},
			pts = [...this.points,coor],
			h = Math.round(360*color.hsl.h);

		// gradient 1 = black => white
		const g1 = this.canvas.createLinearGradient(pts[1], pts[2]);
		g1.addColorStop(0, `hsl(${h},0%,100%)`);
		g1.addColorStop(1, `hsl(${h},0%,0%)`);

		// gradient 2 = hue => transparent
		const g2 = this.canvas.createLinearGradient(pts[0], pts[3]);
		g2.addColorStop(0, `hsl(${h},100%,50%)`);
		g2.addColorStop(1, `hsl(${h},100%,50%)`);
		
		// draw
		this.drawPath(this.canvas.ctx, g2);
		this.drawPath(this.canvas.ctx, g1);
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