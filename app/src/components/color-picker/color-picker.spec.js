import { expect } from 'chai';
import puppeteer from 'puppeteer';

describe('color-picker componnent', () => {

	let browser, page;

	before(async () => {
		browser = await puppeteer.launch({headless: true});
		page = await browser.newPage();
	});

	beforeEach(async () => {
		page.goto('file:///tmp/isotop/html/index.html');
		await page.waitForNavigation();
		await page.evaluate(() => document.body.innerHTML = '<color-picker></color-picker>');
	});

	after(async () => {
		await page.close();
		await browser.close();
	});

	describe('Should setup default value', () => {

		it('default size', async () => {

			const width = await page.evaluate(() => document.querySelector('color-picker').width);
			const height = await page.evaluate(() => document.querySelector('color-picker').height);

			expect(width).to.equal(250);
			expect(height).to.equal(250);
		});

	});
});