export const Canvas2d = class {
    
	constructor(canvasElement, options = {}) {
		this.canvas = canvasElement;
		this.ctx= canvasElement.getContext('2d');

		for (let key in options) {
			canvasElement[key] = options[key];
		}
	}

	clearAll(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	createLinearGradient(startPoint, endPoint){
		return this.ctx.createLinearGradient(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
	}

	beginPath(){
		return this.ctx.beginPath();
	}

	arc(circle, startAngle, endAngle, anticlockwise){
		return this.ctx.arc(circle.center.x, circle.center.y, circle.radius, startAngle, endAngle, anticlockwise);
	}

	setFillStyle(fillStyle){
		return this.ctx.fillStyle = fillStyle;
	}

	getImageData(topLeftCornerPoint, width, height ){
		return this.ctx.getImageData(topLeftCornerPoint.x, topLeftCornerPoint.y, width, height);
	}

	fill(){
		return this.ctx.fill();
	}
	
};