import SitemapGenerator from 'sitemap-generator';

// create generator
const generator = SitemapGenerator(`https://www.kudadam.com`, {
	stripQuerystring: false,
	changeFreq: 'weekly',
	lastMod: true,
	filepath: './sitemap.xml',
	priorityMap: [1],
	ignore: url => {
		return /^https:\/\/www\.kudadam.com\/$/.test(url)
	}
});

const crawler = generator.getCrawler()
const sitemap = generator.getSitemap()

// Add static URL on crawl init.
crawler.on('crawlstart', () => {
  sitemap.addURL('https://www.kudadam.com')
})


generator.start()