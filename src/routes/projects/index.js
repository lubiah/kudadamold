import projects from "./projects.json";
import { chunk } from "$lib/Scripts/util.js";

export const get = async ({ url })=>{
	let perPage = 6;
	let page = 1;
	const results =  new Object();

	if (url.searchParams){
		if (url.searchParams.has("page"))
			page = url.searchParams.get("page");

		if (url.searchParams.has("per_page"))
			perPage = url.searchParams.get("per_page")
	}
	let chunks = chunk(projects, perPage);
	results['projects'] = chunks[page - 1];

	return {
		body: new Object(results)
	}
}