import  { initDB } from "$lib/scripts/mysql.js";
import { mode } from "$app/env";

const { db } = initDB();



	
export const get = async (request)=>{
	const slug = request.params.slug;
	const path = request.path;

	return {
		headers: {
			"Content-Type":"application/json"
		},
		body: {"a":"bv"}
	}
}