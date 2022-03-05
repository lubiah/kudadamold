export const get = async ({ url })=>{
    let endpoint = new URL(`${url.origin}/blog.json`);
    endpoint.searchParams.set("all","true");
    let request = await fetch(endpoint);
    let { posts } = await request.json();
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