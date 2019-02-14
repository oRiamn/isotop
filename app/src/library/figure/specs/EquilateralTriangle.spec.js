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
			const ab = a.calculateDistance(b),
				bc = b.calculateDistance(c),
				ca = c.calculateDistance(a);

			expect(ab).to.be.closeTo(bc, 1e-14);
			expect(ca).to.be.closeTo(bc, 1e-14);
		});

		it('all point are same distance of center', () => {
			expect(triangle.radius).not.equal(0);

			expect(g.calculateDistance(a)).to.be.closeTo(triangle.radius, 1e-14);
			expect(g.calculateDistance(b)).to.be.closeTo(triangle.radius, 1e-14);
			expect(g.calculateDistance(c)).to.be.closeTo(triangle.radius, 1e-14);
		});
	});

});