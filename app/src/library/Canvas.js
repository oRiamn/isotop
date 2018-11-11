export default class Canvas {

	constructor(canvasElement) {
		this.el=canvasElement;
		this.ctx = this.el.getContext('2d');
	}
	
	clear(){
		this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
	}

	drawCircle(x, y, r, style, start, end) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, start || 0, end || Math.PI * 2);
		if (style.fill) {
			this.ctx.fillStyle = style.fill;
			this.ctx.fill();
		}
		if (style.stroke) {
			this.ctx.strokeStyle = style.stroke;
			this.ctx.stroke();
		}
		if (style.lineWidth) {
			this.ctx.lineWidth = style.lineWidth;
		}
	}

	drawTriangle(points, fill) {
		this.ctx.beginPath();
		this.ctx.moveTo(points[0].x, points[0].y);
		for (let i = points.length - 2; i >= 0; i--) {
			this.ctx.lineTo(points[i].x, points[i].y);
		}
		this.ctx.fillStyle = fill;
		this.ctx.fill();
	}
}