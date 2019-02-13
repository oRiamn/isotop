/* eslint-disable no-undef */
import { expect } from 'chai';
import puppeteer from 'puppeteer';

describe('color-picker componnent', () => {

	let browser, page;

	before(async () => {
		browser = await puppeteer.launch({headless: true});
		page = await browser.newPage();
		await page.setViewport({
			'width': 400,
			'height': 400
		});
	});

	beforeEach(async () => {
		page.goto('file:///tmp/isotop/html/test.html');
		await page.waitForNavigation();
		await page.evaluate(() => document.body.innerHTML = '<color-picker></color-picker>');
		await page.evaluate(() => {
			window.element = document.querySelector('color-picker');
		});
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

	describe('Should setup color', () => {

		it('#setCursorColor: setup color-picker with specific color', async () => {
			await page.evaluate(() => {
				var newColor = new isotop.color.CssColor();
				newColor.fromHEX('#2240b8');
				element.setCursorColor(newColor);
			});

			const color = await page.evaluate(() => element.color.toHEX());
			const angle = await page.evaluate(() => element.triangle.angle);
			const cursorPosition = await page.evaluate(() => element.cursor.center);

			expect(color).to.equal('#2240b8');
			expect(angle).to.equal(3.9793506945470707);
			expect(cursorPosition).to.deep.equal({x: 86.58507566962714, y: 102.99322371854794});
		});

	});
});