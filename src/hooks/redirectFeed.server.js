/**@type {import("@sveltejs/kit").Handle} */
export const redirectFeed = async ({ event, resolve }) => {
	if (event.url.pathname === "/blog/feed") {
		return Response.redirect(`${event.url.origin}/blog/feed.xml`, 301);
	}
	return await resolve(event);
};
