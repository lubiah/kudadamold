import { getFiles } from "../index.json";
import { token_set_ratio } from "fuzzball";

const getRelatedArticles = async (title,posts)=>{
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
    const related_articles = [...related_posts].map(post => {
        delete post["html"];
        return post;
    });
    return related_articles;
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