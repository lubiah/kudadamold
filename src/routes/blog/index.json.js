import { fdir } from "fdir";
import front_matter from "front-matter";
import fs from "fs";

const crawler = new fdir().glob("*.md"); //The crawler 
const files = crawler.crawl("./blog").sync();
let id = 1;
let filtered = files.filter((file)=>{
	let contents = fs.readFileSync(`./blog/${file}`,'utf-8');
	let fm = front_matter(contents).attributes;
	if (fm.draft !== true)
		return fm;
});
let posts = filtered.map((file)=>{
	let contents = fs.readFileSync(`./blog/${file}`,'utf-8');
	let fm = front_matter(contents).attributes;
	fm['slug'] = file.slice(0, file.lastIndexOf("."));
	fm["id"] = id;
	id++;
	return fm;
});

posts.sort((a,b)=> new Date(b.date) - new Date(a.date));

export function get(req, res, next){
	res.writeHead(200, {
		"Content-Type" : "application/json"
	});
	res.end(JSON.stringify(posts));
}
