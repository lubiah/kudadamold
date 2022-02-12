import Path from "path";
import { mode } from "$app/env";
import { encode } from 'html-entities';


let files = new Array();
let imports = import.meta.glob("./_blog/**/*.md");

for (let key in imports){
	files.push([Path.win32.basename(Path.dirname(key)),imports[key]])
}
let id = 1;
files = Promise.all(files.map(async file=>{
	let res = await file[1]();
	let { metadata } = await res;
	metadata.slug = file[0];
	metadata.id = id; id++;
	metadata.html = encode(res.default.render().html)
	if (metadata.draft !== true || mode === "development")
		return metadata;
	})
);

const sort_items = async() => {
	files = await files;
	let rss = ``;
	for (let i in files){
		let post = files[i];
		if (!post)
			continue;
		else{
			rss += 
		`
		<item>
			<title>${post.title}</title>
			<link>https://www.Kudadam.com/blog/${post.slug}</link>
			<description>${post.html}</description>
			<category>${post.category}</category>
			<guid>https://www.Kudadam.com/blog/${post.slug}</guid>
			<pubDate>${new Date(post.date)}</pubDate>
		</item>
		`;
		}
	}
	return rss;
	}

export async function get() {
	try {
	let sorted = sort_items();
	let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
	<channel>
		<title>Kudadam Blog</title>
		<link>https://www.kudadam.com/blog</link>
		<language>en-us</language>
		<description>Lucretius' personal blog on tech, programming and stuff</description>
		<category>Technology</category>
		<image>
			<url>https://kudadam.sirv.com/logo/logo.png</url>
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
