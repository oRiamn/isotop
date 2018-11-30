import { expect } from 'chai';

import { Triangle } from '../Triangle';
import { Point } from '../Point';

const collisionMock = require('./mocks/triangle.json');

describe('Point', () => {
	let triangle;

	beforeEach(() => {
		triangle = new Triangle(
			new Point(1,1),
			new Point(5,2),
			new Point(2,4),
			0
		);
	});
	
	describe('#collisionPoint: detect colision between triangle and point', () => {

		let point;

		beforeEach(() => {
			triangle = new Triangle(
				new Point(0,0),
				new Point(15,40),
				new Point(60,60),
				0
			);
			point = new Point(0,0);
		});

		it('should move to a new position with x and y coordinates', () => {
			let cloudPoints=[];
			for (let x = 0; x < 60; x++) {
				cloudPoints[x]=[];
				for (let y = 0; y < 60; y++) {
					point.moveTo(x,y);
					cloudPoints[x][y] = triangle.collision(point) ? '*' : ' ';
				}
				
				cloudPoints[x]=cloudPoints[x].join('');
			}

			expect(cloudPoints.join()).to.equal(collisionMock.join());
		});

	});
});