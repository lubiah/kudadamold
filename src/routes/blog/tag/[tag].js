export const get = async ({ url, params })=>{
    let tag = params.tag;
    let endpoint = new URL(`${url.origin}/blog.json`);
    endpoint.searchParams.set("all","true");
    let request = await fetch(endpoint);
    let { posts } = await request.json();
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