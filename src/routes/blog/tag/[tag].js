import { getFiles } from "../index.json";

export const get = async ({ url, params })=>{
    let tag = params.tag;
    let posts = await getFiles();
    let filtered = posts.filter(post => {
        if (post.tags){
            return post.tags.includes(tag)
        }
    });

    if (filtered.length === 0){
        return {
            fallthrough: true
        }
    }

    return {
        body: {
            posts: filtered,
            tag
        },
        headers: {
            accept: "application/json"
        }
    }
}