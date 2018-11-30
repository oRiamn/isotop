import { expect } from 'chai';
import { Point } from '../Point';

describe('Point', () => {
	let point;

	beforeEach(() => {
		point = new Point(0,0);
	});
	
	describe('#moveTo : move a point', () => {

		beforeEach(() => {
			point = new Point(0,0);
		});

		it('should move to a new position with x and y coordinates', () => {

			point.moveTo(10, 20);

			expect(point.x).to.equal(10);
			expect(point.y).to.equal(20);
		});

	});


	describe('#calculateDistance : get distance bot 2 points', () => {

		let p1, p2;

		beforeEach(() => {
			p1 = new Point(0,0);
			p2 = new Point(5,10);
		});

		it('should return absolute distance between 2 points', () => {
			expect(p1.calculateDistance(p2)).to.equal(p2.calculateDistance(p1));
		});

		it.skip('should return right distance between 2 points', () => {
			expect(p1.calculateDistance(p2)).to.equal(11.180339887498949);
		});

	});

});