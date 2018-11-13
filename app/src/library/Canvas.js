export const Canvas2d = class {
    
	constructor(canvasElement,width, height ) {
		this.canvas = canvasElement;
		canvasElement.width= width;
		canvasElement.height = height;
		this.ctx= canvasElement.getContext('2d');
	}

	createLinearGradient(startPoint, endPoint){
		return this.ctx.createLinearGradient(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
	}

	beginPath(){
		return this.ctx.beginPath();
	}

	arc(circle, startAngle, endAngle, anticlockwise){
		this.ctx.arc(circle.center.x, circle.center.y, circle.radius, startAngle, endAngle, anticlockwise);
	}

	setFillStyle(fillStyle){
		this.ctx.fillStyle = fillStyle;
	}

	fill(){
		this.ctx.fill();
	}
	
};