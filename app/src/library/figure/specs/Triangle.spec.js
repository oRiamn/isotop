import { expect } from 'chai';
import { printThroughCollision } from './mocks/print';

import { Triangle } from '../Triangle';
import { Point } from '../Point';

const collisionMock = require('./mocks/triangle.json');

describe('Triangle', () => {
	let triangle, a, b, c, g;

	describe('#constructor: setup triangle', () => {

		beforeEach(() => {
			triangle = new Triangle(
				new Point(28,34),
				new Point(17,17),
				new Point(41,17),
				0
			);
		});

		it('should calculate center on constructor', () => {
			expect(triangle.center.x).to.equal(28.666666666666668);
			expect(triangle.center.y).to.equal(22.666666666666668 );
		});
	});
	
	describe('#collisionPoint: detect collision between triangle and point', () => {

		beforeEach(() => {
			triangle = new Triangle(
				new Point(28,34),
				new Point(17,17),
				new Point(41,17),
				0
			);
		});

		it('should print triangle through collision', () => {
			const cloudPoints =  printThroughCollision(triangle, 60, 60);
			expect(cloudPoints.join()).to.equal(collisionMock.normal.join());
		});
	});

	describe('#rotateTo: make a rotation', () => {

		beforeEach(() => {
			triangle = new Triangle(
				new Point(28,34),
				new Point(17,17),
				new Point(41,17),
				0
			);

			a = triangle.points[0];
			b = triangle.points[1];
			c = triangle.points[2];
			g = triangle.center;
		});

		it('able to rotate 2005° and normalize angle to 45°', () => {
			
			triangle.rotateTo(12*Math.PI + Math.PI/4);

			expect(a.x.toFixed(14)).equal((20.181385292428118).toFixed(14));
			expect(a.y.toFixed(14)).equal((30.209138999323194).toFixed(14));

			expect(b.x.toFixed(14)).equal((24.42402597954735).toFixed(14));
			expect(b.y.toFixed(14)).equal((10.410149126099855).toFixed(14));

			expect(c.x.toFixed(14)).equal((41.39458872802454).toFixed(14));
			expect(c.y.toFixed(14)).equal((27.380711874576946).toFixed(14));

			expect(triangle.angle.toFixed(14)).equal((Math.PI/4).toFixed(14));
			
		});

		it('rotate 360° give same position', () => {

			const oldA =  new Point(a.x, a.y),
				oldB =  new Point(b.x, b.y),
				oldC =  new Point(c.x, c.y);

			triangle.rotateTo(2*Math.PI);
			
			expect(a.x.toFixed(14)).equal(oldA.x.toFixed(14));
			expect(a.y.toFixed(14)).equal(oldA.y.toFixed(14));

			expect(b.x.toFixed(14)).equal(oldB.x.toFixed(14));
			expect(b.y.toFixed(14)).equal(oldB.y.toFixed(14));

			expect(c.x.toFixed(14)).equal(oldC.x.toFixed(14));
			expect(c.y.toFixed(14)).equal(oldC.y.toFixed(14));
			
		});
	});
});