import { getFiles } from "../index.json";

export const get = async ({ url })=>{
    let posts = await getFiles();
    let tags = new Set();
    posts.forEach(post => {
        if (post.tags){
            tags.add(...post.tags);
        }
    });
    tags = new Array(...tags);
    return {
        body: {
            tags
        }
    }
}