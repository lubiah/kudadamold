/*
This is the file responsible for creating the sitemap for my website.
It is not made to be run directly but only run after the website has been built, deployed and served.
*/

import SitemapGenerator from 'sitemap-generator';

// create generator
const generator = SitemapGenerator(`https://www.kudadam.com`, {
	stripQuerystring: false,
	changeFreq: 'weekly',
	lastMod: true,
	filepath: './sitemap.xml',
	priorityMap: [1]
});

generator.on('done', () => {});
generator.start();
