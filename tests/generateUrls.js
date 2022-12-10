//@ts-check

import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import crawler from 'simplecrawler';
import { writeFile } from 'fs';

const main = async () => {
	const links = new Set();
	const PORT = 5000;
	const configFile = fileURLToPath(new URL('../vite.config.js', import.meta.url));
	const Server = await createServer({
		configFile,
		mode: 'development',
		server: {
			port: PORT
		}
	});
	await Server.listen();

	const Crawler = new crawler(`http://localhost:${PORT}`);
	Crawler.on('fetchcomplete', (queueItem, _responseBody, response) => {
		if (response.headers['content-type'] === 'text/html') {
			links.add(queueItem.url);
		}
	});
	Crawler.on('complete', () => {
		Server.close();
		const paths = [...links].map((link) => {
			return new URL(link).pathname;
		});
		let fileData = JSON.stringify({ paths });
		let path = fileURLToPath(new URL('./urls.json', import.meta.url));
		writeFile(path, fileData, () => {});
	});

	Crawler.start();
};

main();
