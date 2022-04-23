export const get = async ({ url })=>{
    let request = await fetch(`${url.origin}/blog/__data.json?all=true&exclude=posts`);
    let { all } = await request.json();
    const categories = new Set(all.map(post=> {
        return post.category;
    }));
    const results = new Object();
    results["categories"] = [...categories];

    return {
        body: results
    }
}