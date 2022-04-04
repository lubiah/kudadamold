import Path from "path";
import { chunk } from "$lib/Scripts/util.js";
import { mode } from "$app/env";
import Cache from "cache";
import sqlite from "sqlite3";

let cache = new Cache(86400 * 1000);
let files = new Array();
let imports = import.meta.glob("./_blog/**/*.md");
const db = new sqlite.Database("./database.db", err=>{});
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
	if (cache.get("popular_articles") === null){
		return new Promise((resolve, reject)=>{
			db.serialize(()=>{
				db.all("SELECT * FROM BLOG ORDER BY hits DESC LIMIT 0,6",(err,data)=>{
					if (err)
						reject(err)
					cache.put("popular_articles",data);
					resolve(data)
				})
			})
		})
	}
	return cache.get("popular_articles");
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

	if (query.get("popular_articles")) {
		let popular_data = await getPopularArticles();
		popular_data = popular_data.map(data=>{ return data.slug});
		let files = await getFiles();
		files = files.filter(file=> {
			for(let i = 0; i < popular_data.length; i++){
				let index = popular_data[i];
				if (file.slug === index)
					return file;

			}
		});
		results["popular_articles"] = files;
	}

	if (query.get('limit')) {
		results['limit'] = posts.length;
	}

	if (query.get('all')) {
		results['posts'] = unsorted;
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


	return {
		body: JSON.stringify(results)
	}

	
}



export { getFiles }