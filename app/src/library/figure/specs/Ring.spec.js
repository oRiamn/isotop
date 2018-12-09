import { expect } from 'chai';
import { Ring } from '../Ring';
import { Point } from '../Point';
import { printThroughCollision } from './mocks/print';

const collisionMock = require('./mocks/ring.json');

describe('Ring', () => {
	let ring, c;

	beforeEach(() => {
		c = new Point(30,30),
		ring = new Ring(c, 20, 10);
	});
	
	describe('#constructor: setup ring', () => {

		it('should setup ring boundaries on constructor', () => {
			expect(ring.radLarge).to.equal(ring.radius);
			expect(ring.radLarge).to.equal(20);

			expect(ring.radSmall).to.equal(ring.radius-ring.weight);
			expect(ring.radSmall).to.equal(10);
		});
	});

	describe('#collisionPoint: detect collision between triangle and point', () => {

		it('should print triangle through collision', () => {
			const cloudPoints =  printThroughCollision(ring, 60, 60);
			expect(cloudPoints.join()).to.equal(collisionMock.normal.join());
		});
	});
});