import { fdir } from 'fdir';
import front_matter from 'front-matter';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const blog_contents_dir = 'src/routes/blog/_blog';
const crawler = new fdir().onlyDirs().normalize(); //The crawler
let files = crawler.crawl(blog_contents_dir).sync(); //Gets the files
files = files.map((file) => {
	return file.split(path.sep).slice(-1)[0];
}); //Removes the root path leaving only the folder name
files = files.slice(1);

let id = 1;
let filtered = files.filter((file) => {
	let contents = fs.readFileSync(`${blog_contents_dir}/${file}/index.md`, 'utf-8');
	let fm = front_matter(contents).attributes;
	if (fm.draft !== true) return fm;
});
let posts = filtered.map((file) => {
	let contents = fs.readFileSync(`${blog_contents_dir}/${file}/index.md`, 'utf-8');
	let fm = front_matter(contents).attributes;
	fm['slug'] = file;
	fm['id'] = id;
	id++;
	return fm;
});
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

let unsorted = posts;
posts = _.chunk(posts, 6);

export async function get({ query }) {
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
		body: {
			...results
		}
	};
}
