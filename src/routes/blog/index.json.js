import Path from "path";
import { chunk } from "$lib/Scripts/util.js";
import { mode } from "$app/env";
import sqlite from "sqlite3";

const db = new sqlite.Database("./database.db",(err)=>{});



export const getFiles = async ()=>{
	let array = new Array();
	let data = import.meta.glob("./_blog/**/*.md");
	for (const datum in data)
		array.push([Path.win32.basename(Path.dirname(datum)),data[datum]()]);
	let id = 1;
	// let files = array.filter(async file=>{
	// 	let contents = await file[1];
	// 	let { metadata } = await contents;
	// 	metadata.slug = file[0];
	// 	metadata.id = id; id++;
	// 	return metadata.draft !== true || mode === "development"
	// }).map(async file => {
	// 	let contents = await file[1];
	// 	let { metadata } = await contents;
	// 	if (metadata.draft === true)
	// 		console.log(metadata)
	// 	return metadata;
	// });
	let files = Promise.all(array.map(async file => {
		let { metadata } = await file[1];
		metadata.slug = file[0];
		metadata.id = id; id++;
		return metadata
	}));

	files = await files;
	files = files.filter(data => data.draft !== true || mode === "development")
	files = files.sort((a, b)=>  new Date(b.date) - new Date(a.date))
	return files;
}

export const getPopularArticles = async ()=>{
	return new Promise((resolve, reject)=>{
		db.serialize(()=>{
			db.all("SELECT * FROM BLOG ORDER BY hits DESC LIMIT 0,6",(err,data)=>{
				if (err)
					reject(err)
				else {
					getFiles().then(files => {
						let valid = files.filter(file => {
							let popular_slug = data.map(data => {return data.slug});
							return popular_slug.includes(file.slug)
						})
						.map(file => {
							delete file['html'];
							return file;
						});
						resolve(valid)
					})
				}
			})
		})
	})
}


export const get = async ( { url })=> {  
	let posts = await getFiles();
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
		results["popular_articles"] = popular_data;
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

	if (query.get('limit')) {
		results['limit'] = chunked.length;
	}

	
	return {
		headers: {
			"Content-Type": "application/json"
		},
		body: results
	}

	
}


