export const chunk = (collection, size)=>{
    var result = [];
    size = parseInt(size) || 2;

    for (var x = 0; x < Math.ceil(collection.length / size); x++) {
        var start = x * size;
        var end = start + size;
  
        result.push(collection.slice(start, end));
      }
    return result;
}

export const snakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');

export const importScripts = (url,object) => {
  return new Promise((resolve, reject)=>{
    let script  = document.querySelector(`script[src="${url}"]`);
    if (!script){
        script = document.createElement("script");
        script.setAttribute("src",url);
        for (let obj in object){
          script.setAttribute(obj,object[obj]);
        }
        script.addEventListener("load",()=>{resolve(true)})
        document.querySelector("head").appendChild(script);
    }
    
  })
}

export const importLinks = (url,options={}) => {
  return new Promise((resolve, reject)=>{
    let link = document.querySelector(`link[href="${url}"]`);
    if (!link){
      link = document.createElement("link");
      for (let option in options){
        link.setAttribute(option,options[option])
      }
      link.onload = resolve(true);
      link.setAttribute("href",url);
      document.querySelector("head").appendChild(link);
    }
    reject('already exists');
  })
}
