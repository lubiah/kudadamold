import { getFiles } from "../index.js";

export const get = async ()=>{
	let posts = await getFiles();
	const categories = new Set(posts.map(post=> {
        return post.category;
    }));
    const results = new Object();
    results['categories'] = [...categories];
    
    return {
    	body: results
    }
}