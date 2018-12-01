import { expect } from 'chai';

import { Point } from '../Point';
import { EquilateralTriangle } from '../EquilateralTriangle';

describe('EquilateralTriangle', () => {
	let triangle;


	describe('#constructor: setup triangle', () => {

		beforeEach(() => {
			triangle = new EquilateralTriangle(
				new Point(0,0),
				20,
				0
			);
		});

		it('all side are egal', () => {
			const a = triangle.points[0],
				b = triangle.points[1],
				c = triangle.points[2];

			const ab = a.calculateDistance(b),
				bc = b.calculateDistance(c),
				ca = c.calculateDistance(a);

			expect(ab.toFixed(12)).to.equal(bc.toFixed(12));
			expect(ca.toFixed(12)).to.equal(bc.toFixed(12));
		});
	});

});