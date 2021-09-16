const get_items = async () => {
	let res = await fetch(`https://kudadam.com/blog.json?all=true`);
	let { posts } = await res.json();
	return posts;
};

const sort_items = (posts) => {
	let rss = ``;
	posts.forEach((post) => {
		rss += `
<item>
	<title>${post.title}</title>
	<link>https://www.kudadam.com/blog/${post.slug}</link>
	<description>${post.description}</description>
	<category>${post.category}</category>
	<pubDate>${post.date}</pubDate>
</item>\n`;
	});
	return rss;
};

export async function get(request) {
	try {
	let posts = await get_items();
	let sorted = sort_items(posts);
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
    		<title>Kudadam Blog logo</title>
    		<link>https://www.kudadam.com/blog</link>
  		</image>
		${sorted}
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
		return {
			body: "Error Occured"
		}
	}
	
}
