import { getFiles } from "../blog/index.json"

export const get = async ()=>{
    const files = await getFiles();
    const results = new Object();
    results['data'] = files;
    return {
        body: results
    }
}