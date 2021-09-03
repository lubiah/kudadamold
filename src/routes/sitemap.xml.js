/*
This file is responsible for displaying the sitemap
*/

import fs from "fs";

export function get(req, res, next){
  try {

    let contents = fs.readFileSync("./sitemap.xml","utf-8");
    res.setHeader("Content-Type","application/xml");
    res.end(contents);
  }
  catch(err){
    res.setHeader("Content-Type","text/plain");
    res.end("Error");
  }
}
