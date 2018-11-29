import { expect } from 'chai';

import { Color } from './color';


describe('Color', () => {
	let color;

	beforeEach(() => {
		color = new Color();
	});
	
	describe('#fromHEX : setup color form HEX string', () => {

		beforeEach(() => {
			color = new Color();
		});

		it('should make right color from small format', () => {

			color.fromHEX('000');

			expect(color.r).to.equal(0);
			expect(color.g).to.equal(0);
			expect(color.b).to.equal(0);


			color.fromHEX('fff');

			expect(color.r).to.equal(1);
			expect(color.g).to.equal(1);
			expect(color.b).to.equal(1);
			
			color.fromHEX('f00');

			expect(color.r).to.equal(1);
			expect(color.g).to.equal(0);
			expect(color.b).to.equal(0);

			color.fromHEX('0f0');

			expect(color.r).to.equal(0);
			expect(color.g).to.equal(1);
			expect(color.b).to.equal(0);

			color.fromHEX('00f');
			
			expect(color.r).to.equal(0);
			expect(color.g).to.equal(0);
			expect(color.b).to.equal(1);
		});

		it('should make right color from long format', () => {

			color.fromHEX('000000');

			expect(color.r).to.equal(0);
			expect(color.g).to.equal(0);
			expect(color.b).to.equal(0);

			color.fromHEX('ffffff');

			expect(color.r).to.equal(1);
			expect(color.g).to.equal(1);
			expect(color.b).to.equal(1);

			color.fromHEX('ff0000');

			expect(color.r).to.equal(1);
			expect(color.g).to.equal(0);
			expect(color.b).to.equal(0);

			color.fromHEX('00ff00');

			expect(color.r).to.equal(0);
			expect(color.g).to.equal(1);
			expect(color.b).to.equal(0);

			color.fromHEX('0000ff');

			expect(color.r).to.equal(0);
			expect(color.g).to.equal(0);
			expect(color.b).to.equal(1);
		});
	
		it('should fail from a bad format', () => {

			expect(() => color.fromHEX('fffffff')).to.throw(Error);
			expect(() => color.fromHEX('ff')).to.throw(Error);

			expect(() => color.fromHEX('#fff')).to.throw(Error);			
			expect(() => color.fromHEX('#ffffff')).to.throw(Error);
			
		});

	});

	describe('#fromRGBA : setup color form RGBA values', () => {

		beforeEach(() => {
			color = new Color();
		});

		it('should make right color from [0-255] range format', () => {

			color.fromRGBA(0,0,0);

			expect(color.r).to.equal(0);
			expect(color.g).to.equal(0);
			expect(color.b).to.equal(0);


			color.fromRGBA(255,255,255);

			expect(color.r).to.equal(1);
			expect(color.g).to.equal(1);
			expect(color.b).to.equal(1);
			
			color.fromRGBA(255,0,0);

			expect(color.r).to.equal(1);
			expect(color.g).to.equal(0);
			expect(color.b).to.equal(0);

			color.fromRGBA(0,255,0);

			expect(color.r).to.equal(0);
			expect(color.g).to.equal(1);
			expect(color.b).to.equal(0);

			color.fromRGBA(0,0,255);
			
			expect(color.r).to.equal(0);
			expect(color.g).to.equal(0);
			expect(color.b).to.equal(1);
		});

		it('should make right color from [0-1] range format', () => {

			color.fromRGBA(0,0,0);

			expect(color.r).to.equal(0);
			expect(color.g).to.equal(0);
			expect(color.b).to.equal(0);

			color.fromRGBA(1,1,1);

			expect(color.r).to.equal(1);
			expect(color.g).to.equal(1);
			expect(color.b).to.equal(1);
			
			color.fromRGBA(1,0,0);

			expect(color.r).to.equal(1);
			expect(color.g).to.equal(0);
			expect(color.b).to.equal(0);

			color.fromRGBA(0,1,0);

			expect(color.r).to.equal(0);
			expect(color.g).to.equal(1);
			expect(color.b).to.equal(0);

			color.fromRGBA(0,0,1);
			
			expect(color.r).to.equal(0);
			expect(color.g).to.equal(0);
			expect(color.b).to.equal(1);
		});
	
		it('should fail from a bad format', () => {

			expect(() => color.fromRGBA(0,0,256)).to.throw(Error);
			expect(() => color.fromRGBA(0,0,-1)).to.throw(Error);
			expect(() => color.fromRGBA(0,0,'a')).to.throw(Error);
		});

	});

	describe('#fromHSL : setup color form HSL values', () => {

		beforeEach(() => {
			color = new Color();
		});
	});
});
