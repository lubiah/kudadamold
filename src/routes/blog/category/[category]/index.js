import { snakeCase } from "$lib/Scripts/util";

export const get = async ({ url, params })=>{
    const category = params.category;
    const request = await fetch(`${url.origin}/blog/__data.json?all=true`);
    let { all } = await request.json();
    all = all.filter(post=>{
        return snakeCase(post.category) === category;
    });

    if (all.length === 0){
        return {
            status: 404
        }
    }
    

    const results = new Object();
    results["posts"] = all;
    results["category"] = all[0].category;


    return {
        body: results
    }
}
