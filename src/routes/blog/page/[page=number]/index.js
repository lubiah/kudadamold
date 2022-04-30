import { chunk } from "$lib/Scripts/util";
import { getFiles } from "../../index.json.js";

export const get = async ( { params })=>{
    const page = params.page;
    const files = await getFiles();

    if (page === "1"){
        return {
            headers: {
                Location: "/blog"
            },
            status: 301
        }
    }

    if (page > chunk(files,6).length || page === "0"){
        return {
            status: 404
        }
    }
    
    const data = chunk(files, 6);
    const results = new Object();
    results["posts"] = data[page - 1];
    results["page"] = page;
    results["total"] = files.length;

    return {
        body: results
    }
}