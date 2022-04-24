// import { getFiles } from "../../../../../.svelte-kit/types/src/routes/blog/index.json";

import postcssrc from "postcss-load-config";

// export const get = async ({ url, params })=>{
//     let tag = params.tag;
//     let posts = await getFiles();
//     let filtered = posts.filter(post => {
//         if (post.tags){
//             return post.tags.includes(tag)
//         }
//     });

//     if (filtered.length === 0){
//         return {
//             fallthrough: true
//         }
//     }

//     return {
//         body: {
//             posts: filtered,
//             tag
//         },
//         headers: {
//             accept: "application/json"
//         }
//     }
// }

export const get = async ( { url, params  })=>{
    const tag = params.tag;
    const request = await fetch(`${url.origin}/blog/__data.json?all=true&exlude=posts`);
    let  { all } = await request.json();
    all = all.filter(post=>{
        if (post.tags){
            return post.tags.includes(tag);
        }
    })

    const result = new Object();
    result["posts"] = all;
    result["tag"] = tag;

    if (all.length === 0){
        return {
            status: 404
        }
    }

    return {
        body: result
    }
}