import { sequence } from "./helpers.js";

import MinifyHtml from "./minify-html.js";
import RedirectFeed from "./redirect-feed.js";

export const handle = sequence(RedirectFeed, MinifyHtml);