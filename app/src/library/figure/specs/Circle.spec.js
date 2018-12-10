import { expect } from 'chai';
import { Circle } from '../Circle';
import { Point } from '../Point';
import { printThroughCollision } from './mocks/print';

const collisionMock = require('./mocks/circle.json');

describe('Ring', () => {
	describe('#collisionPoint: detect collision between triangle and point', () => {

		let circle, c;


		beforeEach(() => {
			c = new Point(30,30),
			circle = new Circle(c, 25);
		});

		it('should print circle through collision', () => {
			const cloudPoints =  printThroughCollision(circle, 60, 60);
			expect(cloudPoints.join()).to.equal(collisionMock.normal.join());
		});
	});
});