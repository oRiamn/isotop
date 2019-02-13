import Point from '../figure/Point';

export default class Brush {
    
	constructor(center, color, width) {
		this.prev = new Point(center.x, center.y);
		this.center = center;
		this.width=width*2;
		this.color=color;
	}
}