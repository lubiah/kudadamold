import { sequence } from '@sveltejs/kit/hooks';
import { minify } from './minify.server.js';
import { redirectFeed } from './redirectFeed.server.js';

export const handle = sequence(minify, redirectFeed);
