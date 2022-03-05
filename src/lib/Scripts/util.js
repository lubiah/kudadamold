const chunk = (collection, size)=>{
    var result = [];
    size = parseInt(size) || 2;

    for (var x = 0; x < Math.ceil(collection.length / size); x++) {
        var start = x * size;
        var end = start + size;
  
        result.push(collection.slice(start, end));
      }
    return result;
}


export { chunk }