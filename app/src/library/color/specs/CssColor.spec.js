import { expect } from 'chai';

import CssColor from '../CssColor';


describe('CssColor', () => {
	let color;

	beforeEach(() => {
		color = new CssColor();
	});

	describe('#toHEX : export color to css HEX string', () => {
		it('should make right HEX string from several format', () => {

			color.fromHEX('000');
			expect(color.toHEX()).to.equal('#000000');

			color.fromHEX('fff');
			expect(color.toHEX()).to.equal('#ffffff');

			color.fromHEX('aaa');
			expect(color.toHEX()).to.equal('#aaaaaa');

			color.fromRGBA(200,200,200,1);
			expect(color.toHEX()).to.equal('#c8c8c8');

			color.fromRGBA(142, 17, 17, 1);
			expect(color.toHEX()).to.equal('#8e1111');
		});
	});
	
	describe('#toRGB(A) : export color to css RGB string', () => {
		it('should make right RGB and RGBA string from several format', () => {

			color.fromHEX('000');
			expect(color.toRGB()).to.equal('rgb(0,0,0)');
			expect(color.toRGBA()).to.equal('rgba(0,0,0,1)');

			color.fromHEX('fff');
			expect(color.toRGB()).to.equal('rgb(255,255,255)');
			expect(color.toRGBA()).to.equal('rgba(255,255,255,1)');

			color.fromHEX('aaa');
			expect(color.toRGB()).to.equal('rgb(170,170,170)');
			expect(color.toRGBA()).to.equal('rgba(170,170,170,1)');

			color.fromRGBA(200,200,200,1);			
			expect(color.toRGB()).to.equal('rgb(200,200,200)');
			expect(color.toRGBA()).to.equal('rgba(200,200,200,1)');

			color.fromRGBA(200,200,200,.3);			
			expect(color.toRGBA()).to.equal('rgba(200,200,200,0.3)');

			color.fromRGBA(142, 17, 17, 1);			
			expect(color.toRGB()).to.equal('rgb(142,17,17)');
			expect(color.toRGBA()).to.equal('rgba(142,17,17,1)');

			color.fromRGBA(142, 17, 17, 0.5);			
			expect(color.toRGBA()).to.equal('rgba(142,17,17,0.5)');
		});
	});
});
