/*
This is the file responsible for creating the sitemap for my website.
It is not made to be run directly but only run after the website has been built, deployed and served.
*/

const SitemapGenerator = require('sitemap-generator');

// create generator
const generator = SitemapGenerator('https://www.kudadam.com', {
  stripQuerystring: false,
  changeFreq: "weekly",
  lastMod: true,
  priorityMap: [1.0, 0.9,0.8]
});

generator.on('done', () => {
});
generator.start();