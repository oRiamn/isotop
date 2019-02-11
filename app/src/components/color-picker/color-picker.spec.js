import { expect } from 'chai';
const showroom = require('showroom/puppeteer')();

describe('color-picker', () => {
	describe('lol', () => {

		before(async () => {
			await showroom.start();
		});

		beforeEach(async () => {
			await showroom.utils.setTestSubject('color-picker');
		});

		after(async () => {
			await showroom.stop();
		});

		it('set default color', () => {
			expect(true).to.equal(true);
		});
	});
});