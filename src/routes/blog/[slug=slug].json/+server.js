import { json } from "@sveltejs/kit";

export const prerender = false;

/**@type {import("./$types").RequestHandler} */
export const GET = async ({ getClientAddress, params }) => {
	//TODO: Only allow requests from my website

	const ipAddress = getClientAddress();
	const { slug } = params;
	const hits = await (await import("./page-hits.server")).default(ipAddress, slug);
	return json({
		...hits
	});
};
