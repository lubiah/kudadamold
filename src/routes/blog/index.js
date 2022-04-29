import { chunk } from "$lib/Scripts/util.js";
import { getFiles, getPopularArticles } from "./index.json.js";


export const get = async ()=>{
    const results = new Object();
    const posts = await getFiles();

    results['posts'] = chunk(posts,6)[0];
    results['total'] = posts.length;
    results['popular_articles'] = await getPopularArticles();

    return {
        body: results
    }
}