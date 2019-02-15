/* eslint-disable no-undef */
import { expect } from 'chai';
import puppeteer from 'puppeteer';

describe('color-picker componnent', () => {

	let browser, page;

	before(async () => {
		browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--auto-open-devtools-for-tabs' ] 
		});

		page = (await browser.pages())[0];
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
		await page.evaluate(() => {
			window.element = document.createElement('color-picker');
			document.body.appendChild(window.element);
		});
	});

	describe('#connectedCallback: setup color-picker when element append to DOM', () => {

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

	describe('#onmousedown: set color when user click on circle or on HSL triangle', () => {

		it('Should able to select all hue value', async () => {
			
			const ring = await page.evaluate(() => element.ring),
				radius = ring.radSmall + ring.weight/2,
				step = 2 * Math.PI / 360;

			let angle,h,x,y;

			for (let i = 0; i < 360; i++) {
				angle = i*step;
				
				x = Math.round(radius * Math.cos(angle) + ring.center.x);
				y = Math.round(radius * Math.sin(angle) + ring.center.y);
				
				await page.mouse.click(x, y);

				h = await page.evaluate(() => Math.round(element.color.hsl.h*360));
				
				expect(h).to.be.closeTo(i,1);
			}
		});

		it('Should setup #5b53ad when user select lightness/saturation', async () => {

			// click in circle for define hue
			await page.mouse.click(75, 20);
			
			// click in triangle for define saturation and lightness
			await page.mouse.click(123, 122);

			const triangleSelectionColor = await page.evaluate(() => element.color.toHEX());
			expect(triangleSelectionColor).to.equal('#5b53ad');			
		});

	});

});