import  { initDB } from "$lib/scripts/mysql.js";
import { mode } from "$app/env";

const { db } = initDB();



	
export const get = async (request)=>{
	const slug = request.params.slug;
	const posts_res = await fetch(`http://${request.headers.host}/blog.json`);
	const posts = await posts_res.json();

	return {
		headers: {
			"Content-Type":"application/json"
		},
		body: {"a":"bv"}
	}
}