import { fdir } from "fdir";
import MarkdownIt from "markdown-it";
import fs from "fs";
import 'highlight.js/styles/github.css';
//=====================================

let page = new Object();
const crawler = new fdir().glob("*.md"); 
var files  = crawler.crawl("./blog").sync(); //Fetches all files with 'md' extension
files = files.map(file => file.slice(0, file.lastIndexOf("."))); //Removes the file extension

const markdown = new MarkdownIt({
	html : true,
	linkify : true,
	typography : true,
	xhtmlOut : true,
	breaks: true,
	highlight : (code, lang)=>{
		const hljs = require("highlight.js");
		const language = hljs.getLanguage(lang) ? lang : 'plaintext';
		return hljs.highlight(code, { language }).value;
	} 
});
markdown.use(require("markdown-it-anchor"));
markdown.use(require("markdown-it-table-of-contents"),{
	"includeLevel" : [2,3,4,5],
	"containerClass" : "toc",
	"containerHeaderHtml" : "<h3>Table Of Contents</h3>",
	"markerPattern" : /\[toc\]/i,
	"transformLink" : (e)=>{
		return `/blog/${page.slug}${e}`
	}
});
markdown.use(require('markdown-it-attrs'));
markdown.use(require('markdown-it-task-lists'));

export function get(req, res, next){
	const { slug } = req.params; //Gets the slug
	var exists = (files.filter(file => file === slug).length === 1) ? true : false;	//Checks if the slug exists or not
	if (exists){
		page.slug = slug;
		let contents = fs.readFileSync(`./blog/${slug}.md`,`utf8`);
		let fm  = require("front-matter");
		let front_matter = fm(contents).attributes;
		let marked = markdown.render(fm(contents).body);
		front_matter['html'] = marked;
		front_matter['url'] = slug;
		res.writeHead(200, {
			"Content-Type" : "application/json"
		});
		res.end(JSON.stringify(front_matter));
	}
}
