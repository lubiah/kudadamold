import Path from "path";
import { chunk } from "$lib/Scripts/util.js";
import { mode } from "$app/env";

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
		if (metadata.draft !== true || mode === "development")
			return metadata;
	})
	);


const getFiles = async ()=>{
	let posts = await files;
	posts = posts.filter(file => file !== undefined);
	return posts;
}


export async function get({ url }) {
	let posts = await files;
	posts = posts.filter(file=> file !== undefined);
	posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
	let unsorted = posts;
	posts = chunk(posts,6);
	let query = url.searchParams
	let results = new Object();
	results['posts'] = posts[0];

	if (query.get('page')) {
		let page = query.get('page');
		results['posts'] = posts[page - 1];
	}

	if (query.get('limit')) {
		results['limit'] = posts.length;
	}

	if (query.get('all')) {
		results['posts'] = unsorted;
	}


	return {
		body: JSON.stringify(results)
	}

	
}



export { getFiles }