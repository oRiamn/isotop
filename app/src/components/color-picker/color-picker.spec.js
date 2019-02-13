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

	after(async () => {
		await page.close();
		await browser.close();
	});

	beforeEach(async () => {
		page.goto('file:///tmp/isotop/html/test.html');
		await page.waitForNavigation();
		await page.evaluate(() => document.body.innerHTML = '<color-picker></color-picker>');
		await page.evaluate(() => {
			window.element = document.querySelector('color-picker');
		});
	});


	describe('Should setup default value', () => {

		it('default size', async () => {

			const width = await page.evaluate(() => element.width);
			const height = await page.evaluate(() => element.height);

			expect(width).to.equal(250);
			expect(height).to.equal(250);
		});

	});

	describe('#setCursorColor: setup color-picker with specific color', () => {

		it('should setup with #2240b8 color', async () => {
			await page.evaluate(() => {
				var newColor = new isotop.color.CssColor();
				newColor.fromHEX('#2240b8');
				element.setCursorColor(newColor);
			});

			const color = await page.evaluate(() => element.color.toHEX());
			const angle = await page.evaluate(() => element.triangle.angle);
			const cursorPosition = await page.evaluate(() => element.cursor.center);

			expect(color).to.equal('#2240b8');
			expect(angle).to.be.closeTo(3.9793506945470707, 1e-15);
			expect(cursorPosition).to.deep.equal({x: 86.58507566962714, y: 102.99322371854794});
		});

		it('should setup with #000000 color', async () => {

			await page.evaluate(() => {
				var newColor = new isotop.color.CssColor();
				newColor.fromHEX('#000000');
				element.setCursorColor(newColor);
			});

			const color = await page.evaluate(() => element.color.toHEX());
			const angle = await page.evaluate(() => element.triangle.angle);
			const cursorPosition = await page.evaluate(() => element.cursor.center);

			expect(color).to.equal('#000000');
			expect(angle).to.be.closeTo(0, 1e-15);
			expect(cursorPosition).to.deep.equal({x: 70.00000000000009, y: 29.737205583711713});
		});
	});


});