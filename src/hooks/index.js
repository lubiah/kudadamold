import { sequence } from "@sveltejs/kit/hooks";
import MinifyHtml from "./minify-html.js";
import RedirectFeed from "./redirect-feed.js";

export const handle = sequence(RedirectFeed, MinifyHtml);