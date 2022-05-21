import { getFilesHtml } from '../index.json.js';
import { snakeCase, includesMany } from '$lib/Scripts/util.js';
import { encodeHtml } from "$lib/Scripts/util.js";


const sort_items = async files => {
	let rss = ``;
	files.forEach(post => {
		rss += 	`
<item>
	<title>${post.title}</title>
	<link>https://www.Kudadam.com/blog/${post.slug}</link>
	<description>${encodeHtml(post.html)}</description>
	<category>${post.category}</category>
	<guid>https://www.Kudadam.com/blog/${post.slug}</guid>
	<pubDate>${new Date(post.date)}</pubDate>
</item>`;
	});

	return rss;

	}

export async function get({ url }) {
	try {
	let files = await getFilesHtml();
	if (url.searchParams.has("category")){
		let categories = url.searchParams.get("category").split(",");
		files = files.filter(file => {
			let category = snakeCase(file.category);
			return categories.includes(category)
		})
	}

	if (url.searchParams.has("tags")){
		let tags = url.searchParams.get("tags").split(",");
		files = files.filter(file => {
			if (file.tags)
			return includesMany(tags,file.tags)
		})
	}

	let sorted = sort_items(files);
	let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
	<channel>
		<title>Kudadam Blog</title>
		<link>https://www.kudadam.com/blog</link>
		<language>en-us</language>
		<description>Lucretius' personal blog on tech, programming and stuff</description>
		<category>Technology</category>
		<image>
			<url>https://lucretius.sirv.com/logo/logo.png</url>
			<title>Kudadam Blog</title>
			<link>https://www.kudadam.com/blog</link>
		</image>
		${await sorted}
		<copyright>2021 - Now, Lucretius Biah.</copyright>
	</channel>
</rss>`;

	return {
		headers: {
			'Content-Type': 'application/xml'
		},
		body: rss
	};
	}

	catch(e){
		console.log(e)
		return {
			body: "Error"
		}
	}
	
}
