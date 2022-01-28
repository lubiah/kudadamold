import Path from "path";
import chunk from 'chunk';
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


export async function get({ query }) {

	let posts = await files;
	posts = posts.filter(file=> file !== undefined);
	posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
	let unsorted = posts;
	posts = chunk(posts,6);

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

	if (query.get('popular_articles')){
		let sqlite = await import("sqlite3").then(sqlite => {return sqlite.default});
		const db =  new sqlite.Database("./database.db", err=>{});
		let res = new Promise((resolve, reject)=>{
			db.serialize(()=>{
				db.all("SELECT * FROM blog ORDER BY read_times DESC LIMIT 6", async (err,data)=>{
					if (err) reject(err);
					else
						resolve(data);
				})
			})
		});
		res = await res;
		results['popular_articles'] = res;
	}
	return {
		body: {
			...results
		}
	};
}
