import { getFiles } from "../index.json";

const getRelatedArticles = async (title,posts)=>{
    let token_set_ratio = await import("fuzzball").then(e=>e.token_set_ratio);
    const titles = posts
    .map(post=> { return post.title})
    .filter(post => post !== title);
    const related_titles = titles.filter(post =>{ return token_set_ratio(title,post) >= 50 });
    const related_posts = new Set();
    for (let i in related_titles){
        let related_title = related_titles[i];
        for (let j in posts){
            let post = posts[j];
            if (post.title === related_title){
                related_posts.add(post);
            }
        }
    }
    return related_posts;
}


export const get = async ( { params })=>{
    const results = new Object();
    const files = await getFiles();
    const slug = params.slug;
    const title = files.filter(file => file.slug === slug)[0].title;
    const relatedArticles = await getRelatedArticles(title, files);
    results['related_articles'] = [...relatedArticles];
    return {
        body: results
    }
}