export const get = async ({ url, params })=> {
    const page = params.page; 
    const request = await fetch(`${url.origin}/blog/__data.json?page=${page}&total=true&limit=true`);
    const { posts, total, limit } = await request.json();

    if (page === "1"){
        return {
            headers: {Location:"/blog"},
            status: 301
        }
    }
    
    if (page > limit || page === "0"){
        return {
            status: 400
        }
    }

    else {
        return {
            body: {
                posts,
                page,
                total
            }
        }
    }
}