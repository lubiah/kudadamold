import Path from "path";
import { chunk } from "$lib/Scripts/util.js";
import { mode } from "$app/env";
import sqlite from "better-sqlite3";

let files = new Array();
let imports = import.meta.glob("./_blog/**/*.md");
const db = new sqlite("./database.db",{
	readonly:true,
	fileMustExist: true,
});

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

const getPopularArticles = async ()=>{

	return new Promise((resolve, reject)=>{
		try {
			let statement = db.prepare("SELECT * FROM BLOG ORDER BY hits DESC LIMIT 0,6");
			let results = statement.all();
			resolve(results)
		} catch (error) {
			reject(new Error(error))
		}
	})
}


export const get = async ( { url })=> {
	let posts = await files;
	posts = posts.filter(file=> file !== undefined);
	posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
	let unsorted = posts;
	let perPage = 6;
	let page = 1;
	let query = url.searchParams
	let results = new Object();
	results['posts'] = posts[0];

	if (query.get('page')) {
		let page = query.get('page');
		results['posts'] = posts[page - 1];
	}

	if (query.get("popular_articles")) {
		let popular_data = await getPopularArticles();
		popular_data = popular_data.map(data=>{ return data.slug});
		let files = await getFiles();
		files = files.filter(file => popular_data.includes(file.slug));
		files = files.map(file =>{
			delete file['html'];
			return file; 
		});
		results["popular_articles"] = [...files];
	}

	if (query.get('limit')) {
		results['limit'] = posts.length;
	}

	if (query.get('per_page'))
		perPage = query.get('per_page');
	
	if (query.get('page'))
		page = query.get('page')

	if (query.has("total")){
		results["total"] = unsorted.length;
	}

	if (query.get('all')) {
		results['all'] = unsorted;
	}

	if (query.has("exclude")){
		/* 
		This always has to be the last, 
		it is used to removed items from the object
		*/
		let excluded = query.get("exclude").split(",");
		excluded.forEach(key=>{
			delete results[key]
		})
	}

	let chunked = chunk(posts,perPage);
	results['posts'] = chunked[page - 1];
	
	return {
		headers: {
			"Content-Type": "application/json"
		},
		body: results
	}

	
}



export { getFiles }