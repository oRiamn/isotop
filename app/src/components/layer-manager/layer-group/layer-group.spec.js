/* eslint-disable no-undef */
import { expect } from 'chai';
import puppeteer from 'puppeteer';

describe('layer-group componnent', () => {

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
				var subgroup = document.createElement('layer-group'),
					gname = document.createTextNode('List ' + i);
				subgroup.appendChild(gname);
				subgroup.id='subgroup'+i;
				for (let y = 0; y < 4; y++) {
					var item = document.createElement('layer-item'),
						itemName = document.createTextNode('Item ' + i + '-' + y);
					item.appendChild(itemName);
					item.id='item'+y+'-from-subgroup'+i;
					subgroup.appendChild(item);
				}
				root.appendChild(subgroup);
			}
			document.body.appendChild(root);
			document.body.style = 'width: 250px; display: flex; flex-direction: column;';
			window.element = root;
		});
	});

	describe('#open/close: layer-group is able to open and close', () => {

		beforeEach(async () => {
			await page.evaluate(() => {
				window.listActiveElements= () => {
					return Array.from(document.querySelectorAll('.active')).map(e => e.id);
				};
			});
		});

		it('closed layer-group open when user click on it', async () => {
			let activeElementIds;

			activeElementIds = await page.evaluate(() => listActiveElements());
			expect(activeElementIds).to.be.empty;

			await page.click('#root');

			activeElementIds = await page.evaluate(() => listActiveElements());
			expect(activeElementIds).to.deep.equal(['root']);

		});

		it('opened layer-group close when user click on it', async () => {

			let activeElementIds;

			activeElementIds = await page.evaluate(() => listActiveElements());
			expect(activeElementIds).to.be.empty;

			await page.click('#root');

			activeElementIds = await page.evaluate(() => listActiveElements());
			expect(activeElementIds).to.deep.equal(['root']);

			// use that method cause page.click() fire childs element
			await page.evaluate(() => {	document.querySelector('#root').click(); });
			
			activeElementIds = await page.evaluate(() => listActiveElements());
			expect(activeElementIds).to.be.empty;
		});

		it('opened layer-group close when user click on his brother', async () => {

			let activeElementIds;

			await page.click('#root');
			
			activeElementIds = await page.evaluate(() => listActiveElements());
			expect(activeElementIds).to.deep.equal(['root']);

			await page.click('#subgroup0');

			activeElementIds = await page.evaluate(() => listActiveElements());
			expect(activeElementIds).to.deep.equal(['root', 'subgroup0']);

			await page.click('#subgroup2');

			activeElementIds = await page.evaluate(() => listActiveElements());
			expect(activeElementIds).to.deep.equal(['root', 'subgroup2']);

		});
	});

	describe('#renaming: layer-group is able to be renamed', () => {


		beforeEach(async () => {
			await page.evaluate(() => { 
				window.rootLabel = document.querySelector('#root > a');
			});
			await page.click('#root');
		});

		it('when user double click on it', async () => {

			let textContent;

			textContent = await page.evaluate(() => rootLabel.textContent);
			expect(textContent).to.equal(' \n  Root group');

			await page.click('#root > a > editable-label', {
				clickCount: 2
			});

			await page.keyboard.type('Renamed layer-group');
			await page.keyboard.down('Enter');

			textContent = await page.evaluate(() => rootLabel.textContent);
			expect(textContent).to.equal(' \n  Renamed layer-group');
		});
	});

});