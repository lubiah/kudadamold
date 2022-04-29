import { getFiles } from "../../index.json.js";

export const get = async ( { params })=>{
	const tag = params.tag;
	let posts = await getFiles();
	let data = posts.filter(post => {
		if (post.tags){
			return post.tags.includes(tag)
		}
	});
	const results = new Object();
	results['posts'] = data;
	results['tag'] = tag;

	return {
		body: results
	}
}