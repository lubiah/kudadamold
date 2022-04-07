
import { getFiles } from "../../index.json.js";
import { chunk } from "$lib/Scripts/util";

export const get = async ({ params }) =>{
    let page = params.page;
    let files = await getFiles();
    let chunked = chunk(files,6);
    let currentPage = chunked[page - 1];

    if (page === "1")
        return {
            redirect: "/blog",
            status: 301
        }

    if (page > chunked.length || !/^\d+$/gm.test(page) || page == "0"){
	    return {
			status: 404
		}
	}    
    

    
    return {
        body: {
            page,
            posts: currentPage,
            total: files.length
        }
    }
    
}