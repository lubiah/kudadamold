import { compile } from "mdsvex";
import { fdir } from "fdir";
import fs from "fs";
import _ from "lodash";


const remark_slug = require("remark-slug");
const remark_emoji = require("remark-emoji");
const remark_attr = require("remark-attr");

const rehype_toc = require("rehype-toc");


const mdsvexOptions = {
	extension: ".md",
	rehypePlugins: [
		rehype_toc
	],
	remarkPlugins: [
		[remark_attr, {scope:"every"}],
		remark_slug,
		remark_emoji
		
	]
}

const crawler = new fdir().glob("*.md"); //The crawler 
let files = crawler.crawl("exclude/blog").sync();
files  = files.map(file=>{
	return file.slice(0, file.lastIndexOf("."));
});

const file_exists = (page,files) =>{
	let found = files.filter(file=>file === page);
	if (_.isEmpty(found))
		return false;
	else
		return true;
}

export async function get(req,res, next){
	let page = req.params['slug'];
	if (file_exists(page,files)){
		let compiled = await compile(fs.readFileSync(`exclude/blog/${page}.md`,'utf-8'), mdsvexOptions);
		res.writeHead(200, {
		"Content-Type" : "application/json"
	});
	res.end(JSON.stringify(compiled));
	}
	else{
		res.writeHead(400, {
		"Content-Type" : "application/json"
	});
	res.end(JSON.stringify({error:404}));
	}
	
}