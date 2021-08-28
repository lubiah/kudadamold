import { fdir } from "fdir";
import front_matter from "front-matter";
import fs from "fs";
import _ from "lodash";	

const blog_contents_dir = "./src/routes/blog/_blog";
const crawler = new fdir()
.onlyDirs()
.normalize(); //The crawler 
let files = crawler.crawl(blog_contents_dir).sync();
files = files.slice(1).map(file => { return file.split("\\").slice(-1)});
let id = 1;
let filtered = files.filter((file)=>{
	let contents = fs.readFileSync(`${blog_contents_dir}/${file}/index.md`,'utf-8');
	let fm = front_matter(contents).attributes;
	if (fm.draft !== true)
		return fm;
});
let posts = filtered.map((file)=>{
	let contents = fs.readFileSync(`${blog_contents_dir}/${file}/index.md`,'utf-8');
	let fm = front_matter(contents).attributes;
	fm['slug'] = file;
	fm["id"] = id;
	id++;
	return fm;
});

posts.sort((a,b)=> new Date(b.date) - new Date(a.date));

let unsorted = posts;
posts = _.chunk(posts,6);
 
export async function get(req, res, next){
	let results = new Object();
	results['posts'] = posts[0];

	let query = JSON.parse(JSON.stringify(req.query));
	if (query["page"]){
		let page = query["page"];
		results["posts"] = posts[page - 1]; 
	}

	if (query['limit']){
		results["limit"] = posts.length;
	}

	if (query['all']){
		results["posts"] =unsorted;
	}

	res.writeHead(200, {
		"Content-Type" : "application/json"
	});
	res.end(JSON.stringify(results));
}
