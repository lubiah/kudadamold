import { snakeCase } from "$lib/Scripts/util";

export const get = async ({ url, params })=>{
    const category = params.category;
    const request = await fetch(`${url.origin}/blog/__data.json?all=true`);
    let { all } = await request.json();
    all = all.filter(post=>{
        return snakeCase(post.category) === category;
    });
    const results = new Object();
    results["posts"] = all;
    
    return {
        body: results
    }
}