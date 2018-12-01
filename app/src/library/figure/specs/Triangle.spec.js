import { expect } from 'chai';
import { printThroughCollision } from './mocks/print';

import { Triangle } from '../Triangle';
import { Point } from '../Point';

const collisionMock = require('./mocks/triangle.json');

describe('Triangle', () => {
	let triangle;


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
});