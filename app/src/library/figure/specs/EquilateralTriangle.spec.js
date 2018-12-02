import { expect } from 'chai';

import { Point } from '../Point';
import { EquilateralTriangle } from '../EquilateralTriangle';

describe('EquilateralTriangle', () => {
	let triangle, a, b, c, g;

	describe('#constructor: setup triangle', () => {

		beforeEach(() => {
			triangle = new EquilateralTriangle(
				new Point(0,0),
				20,
				0
			);

			a = triangle.points[0];
			b = triangle.points[1];
			c = triangle.points[2];
			g = triangle.center;
		});

		it('all side are egal', () => {
			// fix the number of digits to appear after the decimal point to 12
			const ab = a.calculateDistance(b).toFixed(12),
				bc = b.calculateDistance(c).toFixed(12),
				ca = c.calculateDistance(a).toFixed(12);

			expect(ab).to.equal(bc);
			expect(ca).to.equal(bc);
		});

		it('all point are same distance of center', () => {
			expect(triangle.radius).not.equal(0);
			expect(Math.round(g.calculateDistance(a))).to.equal(triangle.radius);
			expect(Math.round(g.calculateDistance(b))).to.equal(triangle.radius);
			expect(Math.round(g.calculateDistance(c))).to.equal(triangle.radius);
		});
	});

	describe('#rotateTo: make a rotation', () => {

		beforeEach(() => {
			triangle = new EquilateralTriangle(
				new Point(0,0),
				20,
				0
			);

			a = triangle.points[0];
			b = triangle.points[1];
			c = triangle.points[2];
			g = triangle.center;
		});

		it.skip('able to rotate with 10 radian value', () => {
			
			triangle.rotateTo(10);
			
			expect(a.x).equal(-16.781430581529);
			expect(a.y).equal(-10.880422217787);

			expect(b.x).equal(17.813437335269);
			expect(b.y).equal(-9.0929340865555);

			expect(c.x).equal(-1.03200675374);
			expect(c.y).equal(19.973356304343);
			
		});

		it('rotate 360° give same position', () => {

			const oldA =  new Point(a.x, a.y),
				oldB =  new Point(b.x, b.y),
				oldC =  new Point(c.x, c.y);
			
			//triangle.rotateTo(360);
			triangle.rotateTo(2*Math.PI);
			
			expect(a.x).equal(oldA.x);
			expect(a.y).equal(oldA.y);

			expect(b.x).equal(oldB.x);
			expect(b.y).equal(oldB.y);

			expect(c.x).equal(oldC.x);
			expect(c.y).equal(oldC.y);
			
		});
	});

});