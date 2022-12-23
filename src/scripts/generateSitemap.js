import { createServer } from "vite";
import Crawler from "simplecrawler";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";

(async () => {
	const configFile = fileURLToPath(new URL("../vite.config.js", import.meta.url));
	const Server = await createServer({
		configFile,
		mode: "development",
		server: {
			port: 9999
		}
	});
	await Server.listen();
	const crawler = new Crawler(`http://localhost:9999`);

	crawler.on("complete", async () => {
		let filtered = crawler.queue
			.filter(
				(queue) => queue.status === "downloaded" && queue.stateData.contentType === "text/html"
			)
			.map((queue) => queue.path);
		let xml = "";
		filtered.map((location) => {
			xml += `
            <url>
                <loc>${new URL(location, "https://www.kudadam.com").href.replace(/\/+$/, "")}</loc>
                <changefreq>weekly</changefreq/>
                <priority>1</priority/>
            </url>
            `;
		});
		await Server.close();
		let sitemap = `
        <?xml version=”1.0″ encoding=”UTF-8″?>
        <urlset xmlns=”http://www.sitemaps.org/schemas/sitemap/0.9″>
            ${xml}
        </urlset>
        `;
		writeFileSync("static/sitemap.xml", sitemap);
	});

	crawler.start();
})();
