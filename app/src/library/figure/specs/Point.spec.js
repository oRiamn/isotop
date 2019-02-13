import { expect } from 'chai';
import Point from '../Point';

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

		it('should return right distance between 2 points', () => {
			expect(p1.calculateDistance(p2)).to.equal(11.180339887498949);
		});

	});

	describe('#calculateAngle : get angle between 2 points', () => {

		let o,p;

		beforeEach(() => {
			o = new Point(0,0);
		});

		it('should return angle 0°', () => {
			p = new Point(1,0);
			expect(o.calculateAngle(p)).to.equal(0);
		});

		it('should return angle 45°', () => {
			p = new Point(1,1);
			expect(o.calculateAngle(p)).to.equal(Math.PI/4);
		});

		it('should return angle 90°', () => {
			p = new Point(0,1);
			expect(o.calculateAngle(p)).to.equal(Math.PI/2);
		});

		it('should return angle 135°', () => {
			p = new Point(-1,1);
			expect(o.calculateAngle(p)).to.equal(3*Math.PI/4);
		});

		it('should return angle 180°', () => {
			p = new Point(-1,0);
			expect(o.calculateAngle(p)).to.equal(Math.PI);
		});

		it('should return angle 225°', () => {
			p = new Point(-1,-1);
			expect(o.calculateAngle(p)).to.equal(5*Math.PI/4);
		});

		it('should return angle 270°', () => {
			p = new Point(0,-1);
			expect(o.calculateAngle(p)).to.equal(3*Math.PI/2);
		});

		it('should return angle 315°', () => {
			p = new Point(1,-1);
			expect(o.calculateAngle(p)).to.equal(7*Math.PI/4);
		});
	});

});