import { expect } from 'chai';

import Point from '../Point';
import EquilateralTriangle from '../EquilateralTriangle';

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

});