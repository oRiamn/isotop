import { Point } from '../figure/Point';

export const Brush = class {
    
	constructor(center, color, width) {
		this.prev = new Point(center.x, center.y);
		this.center = center;
		this.width=width*2;
		this.color=color;
	}
};