import { expect } from 'chai';
import { printThroughCollision } from './mocks/print';

import { Point } from '../Point';
import { Discus } from '../Discus';



const collisionMock = require('./mocks/discus.json');

describe('Discus', () => {
	let discus;

	beforeEach(() => {
		discus = new Discus(
			new Point(30,30),
			20
		);
	});
	
	describe('#collisionPoint: detect collision between discus and point', () => {

		it('should print discus through collision', () => {
			const cloudPoints =  printThroughCollision(discus, 60, 60);
			expect(cloudPoints.join()).to.equal(collisionMock.normal.join());
		});

	});
});