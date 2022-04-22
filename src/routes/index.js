export const get = async ( { url })=>{
	let articlesFetch = await fetch(`${url.href}blog/__data.json?popular_articles=true&exclude=posts`);
	let articles = await articlesFetch.json();
	let projectsFetch = await fetch(`${url.href}projects/__data.json?per_page=6`);
	let { projects } = await projectsFetch.json();

	return {
		body: {
			articles: articles.popular_articles,
			projects
		}
	}
}