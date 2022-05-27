const lazyLoad = ()=>{
    const config = {
        root: null, // avoiding 'root' or setting it to 'null' sets it to default value: viewport
        rootMargin: '0px',
        threshold: 0.5
      };
    
    let leaving = false;    
    let observer = new IntersectionObserver(entries =>{
        entries.forEach(entry => {
            let element = entry.target;
            if (entry.isIntersecting){
                leaving = true;
                element.setAttribute("src",element.getAttribute("data-src"));
                element.removeAttribute("data-src");
                observer.unobserve(element);
                console.log(element)
            }
            else if (leaving){
                leaving = false;
    
            }
        })
    })
     
    
    const images = document.querySelectorAll("img[data-lazy-load=true]");
    
    images.forEach(image => {
        observer.observe(image)
    })
    
}

export default lazyLoad;