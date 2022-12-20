import Path from "path";
import { encodeHtml } from "$utils";
import { dev } from "$app/environment";

/**
 *
 * @param {Array<any>} files
 * @returns {Promise<string>}
 */
const sort_items = async (files) => {
	let rss = ``;
	files.forEach((post) => {
		rss += `
<item>
	<title>${post.title}</title>
	<link>https://kudadam.com/blog/${post.slug}</link>
	<description>${encodeHtml(post.html)}</description>
	<category>${post.category}</category>
	<guid>https://kudadam.com/blog/${post.slug}</guid>
	<pubDate>${new Date(post.date)}</pubDate>
</item>`;
	});

	return rss;
};

const getFilesHtml = async () => {
	let array = new Array();
	let data = import.meta.glob("../content/**/*.md");
	for (const datum in data) array.push([Path.win32.basename(Path.dirname(datum)), data[datum]()]);
	let id = 1;
	let files = Promise.all(
		array.map(async (file) => {
			let { metadata } = await file[1];
			let def = await file[1];
			metadata.html = def.default.render().html;
			metadata.slug = file[0];
			metadata.id = id;
			id++;
			return metadata;
		})
	);

	let filtered = (await files).filter((data) => data.draft !== true || dev === true);
	let final = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	return final;
};

/**@type {import("./$types").RequestHandler} */
export const GET = async () => {
	const files = await getFilesHtml();
	let sorted = sort_items(files);
	let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
	<channel>
		<title>Kudadam Blog</title>
		<link>https://kudadam.com/blog</link>
		<language>en-us</language>
		<description>Lucretius' personal blog on tech, programming and stuff</description>
		<category>Technology</category>
		<image>
			<url>https://ik.imagekit.io/kudadam/assets/logo.png</url>
			<title>Kudadam Blog</title>
			<link>https://kudadam.com/blog</link>
		</image>
		${await sorted}
		<copyright>2021 - Now, Lucretius Biah.</copyright>
	</channel>
</rss>`;
	return new Response(rss, {
		headers: {
			"Content-Type": "application/xml"
		}
	});
};
