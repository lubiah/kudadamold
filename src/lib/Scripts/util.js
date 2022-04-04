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