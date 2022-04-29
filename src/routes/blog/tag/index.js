import { getFiles } from "../index.js";

export const get = async ()=>{
	const posts = await getFiles();
	const tags = new Set();
	posts.forEach(post=>{
		if (post.tags)
		tags.add(...post.tags)
	})
	const results = new Object();
	results['tags'] = [...tags];

	return {
		body: results
	}
}