import { getProjects } from "./projects/index.js"; 
import { getPopularArticles } from "./blog/index.js";

export const get = async ()=>{
	const results = new Object();
	results['projects'] = getProjects();
	results['articles'] = await getPopularArticles();

	return {
		body: results
	}
}