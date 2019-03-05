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

		it('closed layer-group open when user click on it', async () => {

			const beforeClick = await page.evaluate(() => element.className);
			expect(beforeClick).to.be.empty;

			await page.click('#root');

			const afterClick = await page.evaluate(() => element.className);
			expect(afterClick).to.equal('active');
		});

		it('opened layer-group close when user click on it', async () => {

			const beforeFirstClick = await page.evaluate(() => element.className);
			expect(beforeFirstClick).to.be.empty;

			await page.click('#root');

			const afterFirstClick = await page.evaluate(() => element.className);
			expect(afterFirstClick).to.equal('active');

			// use that method cause page.click() fire childs element
			await page.evaluate(() => {	document.querySelector('#root').click(); });

			const afterSecondClick = await page.evaluate(() => element.className);
			expect(afterSecondClick).to.be.empty;
		});

		it('opened layer-group close when user click on his brother', async () => {

			let classNames;
			await page.evaluate(() => {
				window.getClassenNames= () => {
					return {
						brother1: document.querySelector('#subgroup0').className,
						brother2: document.querySelector('#subgroup2').className
					};
				};
			});

			await page.click('#root');
			
			classNames = await page.evaluate(() => getClassenNames());
			expect(classNames).to.deep.equal({
				brother1: '',
				brother2: ''
			});

			await page.click('#subgroup0');

			classNames = await page.evaluate(() => getClassenNames());
			expect(classNames).to.deep.equal({
				brother1: 'active',
				brother2: ''
			});

			await page.click('#subgroup2');

			classNames = await page.evaluate(() => getClassenNames());
			expect(classNames).to.deep.equal({
				brother1: '',
				brother2: 'active'
			});

		});
	});

});