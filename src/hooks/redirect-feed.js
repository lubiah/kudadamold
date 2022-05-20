// This handler redirects the feeds url from "/blog/feed" to "/blog/feed.xml"

const redirect = async ({ event, resolve })=> {
    if (event.url.pathname === "/blog/feed"){
        return Response.redirect(`${event.url.origin}/blog/feed.xml`,301);
    }
    return await resolve(event);
}


export default redirect;