// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

/** Types for blog posts */
declare interface BlogPost {
	title: string;
	description: string;
	date: Date;
	excerpt: string;
	category: string;
	tags: string[];
	slug: string;
}

declare interface Project {
	name: string;
	description: string;
	image: string;
	demo?: string;
	source?: string;
}

declare module '*.svg' {
	const content: any;
	export default content;
}

declare module '*.svg?component' {
	const content: any;
	export default content;
}

declare module '*.svg?src' {
	const content: string;
	export default content;
}

declare module '*.svg?url' {
	const content: string;
	export default content;
}
