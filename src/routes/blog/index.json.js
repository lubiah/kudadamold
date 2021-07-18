import { fdir } from "fdir";
import front_matter from "front-matter";
import fs from "fs";
import _ from "lodash";	

const crawler = new fdir().glob("*.md"); //The crawler 
const files = crawler.crawl("exclude/blog").sync();

let id = 1;
let filtered = files.filter((file)=>{
	let contents = fs.readFileSync(`exclude/blog/${file}`,'utf-8');
	let fm = front_matter(contents).attributes;
	if (fm.draft !== true)
		return fm;
});
let posts = filtered.map((file)=>{
	let contents = fs.readFileSync(`exclude/blog/${file}`,'utf-8');
	let fm = front_matter(contents).attributes;
	fm['slug'] = file.slice(0, file.lastIndexOf("."));
	fm["id"] = id;
	id++;
	return fm;
});

posts.sort((a,b)=> new Date(b.date) - new Date(a.date));

let unsorted = posts;
posts = _.chunk(posts,7);
 
export async function get(req, res, next){
	let results = posts[0];
	let query = JSON.parse(JSON.stringify(req.query));
	if (query["page"]){
		let page = query["page"];
		results = posts[page - 1]; 
	}

	if (query['limit']){
		results = posts.length;
	}

	if (query['all']){
		results = unsorted
	}

	res.writeHead(200, {
		"Content-Type" : "application/json"
	});
	res.end(JSON.stringify(results));
}
