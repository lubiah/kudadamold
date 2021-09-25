import  { initDB } from "$lib/scripts/mysql.js";
import { mode } from "$app/env";

const { db } = initDB();


const getArticleMeta = async slug=>{
	let url = (mode == "development") ? "http://localhost:3000/blog.json?all=true" : "https://kudadam.com/blog.json?all=true";
	let res = await fetch(url);
	let { posts } = await res.json();
	let post = posts.filter(post => post.slug === slug);
	if (post.length < 1)
		return false;
	return post[0];
}

	
export const get = async (request)=>{
	const slug = request.params.slug;
	const path = request.path;

	const frontmatter = await getArticleMeta(slug);
	
	if (db && frontmatter){
		db.query(`
			CREATE TABLE IF NOT EXISTS blog (
 				id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  			title tinytext UNIQUE NOT NULL,
  			slug tinytext UNIQUE NOT NULL,
  			url tinytext UNIQUE NOT NULL,
  			date date NOT NULL,
  			read_times INT DEFAULT 0
			);
			INSERT IGNORE INTO blog (title,slug,url,date) VALUES( "${frontmatter.title}","${frontmatter.slug}","${path}","${frontmatter.date}");

			UPDATE blog SET read_times = ((SELECT read_times FROM blog WHERE slug = "${frontmatter.slug}") + 1) WHERE slug = "${frontmatter.slug}";
			`,(err,results,fields)=>{

			});
	}

	return {
		body: {"a":"bv"}
	}
}