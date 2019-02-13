import { expect } from 'chai';

import Color from '../Color';


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

			expect(color.hex).to.equal(0x000000);

			color.fromHEX('fff');

			expect(color.hex).to.equal(0xffffff);

			color.fromHEX('f00');

			expect(color.hex).to.equal(0xff0000);

			color.fromHEX('0f0');

			expect(color.hex).to.equal(0x00ff00);

			color.fromHEX('00f');
			
			expect(color.hex).to.equal(0x0000ff);
		});

		it('should make right color from long format', () => {

			color.fromHEX('000000');

			expect(color.hex).to.equal(0x000000);

			color.fromHEX('ffffff');

			expect(color.hex).to.equal(0xffffff);

			color.fromHEX('ff0000');

			expect(color.hex).to.equal(0xff0000);

			color.fromHEX('00ff00');

			expect(color.hex).to.equal(0x00ff00);

			color.fromHEX('0000ff');

			expect(color.hex).to.equal(0x0000ff);
		});
	
		it('should fail from a bad format', () => {
			expect(() => color.fromHEX('fffffff')).to.throw(Error);
			expect(() => color.fromHEX('ff')).to.throw(Error);
		});

		it('should convert from right color', () => {

			color.fromHEX('000');

			expect(color.rgb).to.deep.equal({
				r: 0/255,
				g: 0/255,
				b: 0/255
			});

			expect(color.hsl).to.deep.equal({
				h: 0/360,
				s: 0/100,
				l: 0/100
			});

			expect(color.hsv).to.deep.equal({
				h: 0/360,
				s: 0/100,
				v: 0/100
			});

			color.fromHEX('fff');

			expect(color.rgb).to.deep.equal({
				r: 255/255,
				g: 255/255,
				b: 255/255
			});

			expect(color.hsl).to.deep.equal({
				h: 0/360,
				s: 0/100,
				l: 100/100
			});

			expect(color.hsv).to.deep.equal({
				h: 0/360,
				s: 0/100,
				v: 100/100
			});
			
			color.fromHEX('f00');

			expect(color.rgb).to.deep.equal({
				r: 255/255,
				g: 0/255,
				b: 0/255
			});

			expect(color.hsl).to.deep.equal({
				h: 0/360,
				s: 100/100,
				l: 50/100
			});

			expect(color.hsv).to.deep.equal({
				h: 0/360,
				s: 100/100,
				v: 100/100
			});

			color.fromHEX('0f0');
			
			expect(color.rgb).to.deep.equal({
				r: 0/255,
				g: 255/255,
				b: 0/255
			});

			expect(color.hsl).to.deep.equal({
				h: 120/360,
				s: 100/100,
				l: 50/100
			});

			expect(color.hsv).to.deep.equal({
				h: 120/360,
				s: 100/100,
				v: 100/100
			});

			color.fromHEX('00f');
			
			expect(color.rgb).to.deep.equal({
				r: 0/255,
				g: 0/255,
				b: 255/255
			});

			expect(color.hsl).to.deep.equal({
				h: 240/360,
				s: 100/100,
				l: 50/100
			});

			expect(color.hsv).to.deep.equal({
				h: 240/360,
				s: 100/100,
				v: 100/100
			});
		});

	});

	describe('#fromRGBA : setup color form RGBA values', () => {

		beforeEach(() => {
			color = new Color();
		});

		it('should make right color from [0-255] range format', () => {

			color.fromRGBA(0,0,0);

			expect(color.rgb).to.deep.equal({
				r: 0/255,
				g: 0/255,
				b: 0/255
			});

			color.fromRGBA(255,255,255);

			expect(color.rgb).to.deep.equal({
				r: 255/255,
				g: 255/255,
				b: 255/255
			});
			
			color.fromRGBA(255,0,0);

			expect(color.rgb).to.deep.equal({
				r: 255/255,
				g: 0/255,
				b: 0/255
			});

			color.fromRGBA(0,255,0);

			expect(color.rgb).to.deep.equal({
				r: 0/255,
				g: 255/255,
				b: 0/255
			});

			color.fromRGBA(0,0,255);
			
			expect(color.rgb).to.deep.equal({
				r: 0/255,
				g: 0/255,
				b: 255/255
			});
		});

		it('should make right color from [0-1] range format', () => {

			color.fromRGBA(0,0,0);

			expect(color.rgb).to.deep.equal({
				r: 0/255,
				g: 0/255,
				b: 0/255
			});

			color.fromRGBA(1,1,1);

			expect(color.rgb).to.deep.equal({
				r: 1/255,
				g: 1/255,
				b: 1/255
			});
			
			color.fromRGBA(1,0,0);

			expect(color.rgb).to.deep.equal({
				r: 1/255,
				g: 0/255,
				b: 0/255
			});

			color.fromRGBA(0,1,0);

			expect(color.rgb).to.deep.equal({
				r: 0/255,
				g: 1/255,
				b: 0/255
			});

			color.fromRGBA(0,0,1);

			expect(color.rgb).to.deep.equal({
				r: 0/255,
				g: 0/255,
				b: 1/255
			});
		});
	
		it('should fail from a bad format', () => {

			expect(() => color.fromRGBA(0,0,256)).to.throw(Error);
			expect(() => color.fromRGBA(0,0,-1)).to.throw(Error);
			expect(() => color.fromRGBA(0,0,'a')).to.throw(Error);
		});

		it('should convert from right color', () => {

			color.fromRGBA(0,0,0);

			expect(color.hex).to.equal(0x000000);

			expect(color.hsl).to.deep.equal({
				h: 0/360,
				s: 0/100,
				l: 0/100
			});

			expect(color.hsv).to.deep.equal({
				h: 0/360,
				s: 0/100,
				v: 0/100
			});

			color.fromRGBA(255,255,255);

			expect(color.hex).to.equal(0xffffff);

			expect(color.hsl).to.deep.equal({
				h: 0/360,
				s: 0/100,
				l: 100/100
			});

			expect(color.hsv).to.deep.equal({
				h: 0/360,
				s: 0/100,
				v: 100/100
			});
			
			color.fromRGBA(255,0,0);

			expect(color.hex).to.equal(0xff0000);

			expect(color.hsl).to.deep.equal({
				h: 0/360,
				s: 100/100,
				l: 50/100
			});

			expect(color.hsv).to.deep.equal({
				h: 0/360,
				s: 100/100,
				v: 100/100
			});

			color.fromRGBA(0,255,0);
			
			expect(color.hex).to.equal(0x00ff00);

			expect(color.hsl).to.deep.equal({
				h: 120/360,
				s: 100/100,
				l: 50/100
			});

			expect(color.hsv).to.deep.equal({
				h: 120/360,
				s: 100/100,
				v: 100/100
			});

			color.fromRGBA(0,0,255);
			
			expect(color.hex).to.equal(0x0000ff);

			expect(color.hsl).to.deep.equal({
				h: 240/360,
				s: 100/100,
				l: 50/100
			});

			expect(color.hsv).to.deep.equal({
				h: 240/360,
				s: 100/100,
				v: 100/100
			});
		});

	});
});
