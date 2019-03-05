/* eslint-disable no-undef */
import { expect } from 'chai';
import puppeteer from 'puppeteer';

describe('layer-item componnent', () => {

	let browser, page;

	before(async () => {
		browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--auto-open-devtools-for-tabs' ] 
		});

		page = (await browser.pages())[0];
		await page.setViewport({
			'width': 400,
			'height': 1000
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
			var root = document.createElement('layer-group'),
				rname = document.createTextNode('Root group');
			root.appendChild(rname);
			root.id='root';
			for (let i = 0; i < 3; i++) {
				var item = document.createElement('layer-item'),
					itemName = document.createTextNode('Item ' + i);
				item.appendChild(itemName);
				item.id='item'+i;
				root.appendChild(item);
			}
			document.body.appendChild(root);
			document.body.style = 'width: 250px; display: flex; flex-direction: column;';
			window.element = root;
		});
	});

	describe('#renaming: layer-item is able to be renamed', () => {


		beforeEach(async () => {
			await page.evaluate(() => { 
				window.item1Label = document.querySelector('#item1 > a');
			});
			await page.click('#root');
		});

		it('when user double click on it', async () => {

			let textContent;

			textContent = await page.evaluate(() => item1Label.textContent);
			expect(textContent).to.equal(' \n  Item 1');

			await page.click('#item1 > a > editable-label', {
				clickCount: 2
			});

			await page.keyboard.type('Renamed layer-item');
			await page.keyboard.down('Enter');

			textContent = await page.evaluate(() => item1Label.textContent);
			expect(textContent).to.equal(' \n  Renamed layer-item');
		});
	});

});