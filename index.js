
'use strict';

module.exports = {
	defiant: function(data, xpath) {
		const puppeteer = require('puppeteer');
		const fs = require('fs');
		let that = this;

		const text = '<script>'+ fs.readFileSync('./node_modules/defiant.js/dist/defiant.min.js', 'utf8') +'</script>';

		// pause the queue
		this.pause(true);

		puppeteer.launch().then(async browser => {
			const page = await browser.newPage();
			await page.setContent(text);

			const res = await page.evaluate(async (data, xpath) => {
				return JSON.search(data, xpath);
			}, data, xpath);

			await browser.close();

			// resume queue
			that.resume(res);
		});
	}
};
