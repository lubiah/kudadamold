export const get = async ({ url })=>{
    let request = await fetch(`${url.origin}/blog/__data.json?all=true&exclude=posts`);
    let { all } = await request.json();
    let tags = new Set();
    all.forEach(post => {
        if (post.tags){
            tags.add(...post.tags);
        }
    });

    const results = new Object();
    results["tags"] = [...tags];
    return {
        body: results
    }
}