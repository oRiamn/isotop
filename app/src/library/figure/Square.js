import { Point } from './Point';

export const Square = class {
    
	constructor(center, width, height) {
		this.center = center;
		this.width = width;
		this.height = height;

		this.points=[];
		for (let i = 0; i < 4; i++) {
			this.points.push(new Point(0,0));			
		}

		this.build();

	}

	build(){
		const radius = {
				w: this.width/2,
				h: this.height/2
			},
			sens = [-1,1];

		// calculate positions
		let i = 0;
		sens.map((sensX) => {
			sens.map(sensY => {
				this.points[i].moveTo(
					this.center.x + radius.w*sensX,
					this.center.y + radius.w*sensY
				);
				i++;
			});
		});
		
	}
};