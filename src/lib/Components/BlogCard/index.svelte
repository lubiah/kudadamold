<!-- 
The Card component is used to house the blog posts
 -->
<script type="text/javascript">
	import { snakeCase } from "$lib/Scripts/util.js";
	export let image  = "https://lucretius.sirv.com/logo/logo.png?q=2&canvas.color=white";
	export let title;
	export let date;
	export let slug;
	export let excerpt = "";
	export let category;
	let Class = "";
	export let hide_category = false;
	export {Class as class};

	if (new URL(image).host === "lucretius.sirv.com"){
		image = new URL(image);
		image.searchParams.set("q",5);
	}
</script>

<article class="border dark:border-neutral-800 mr-2 w-[310px] hover:shadow-lg rounded mb-9 relative {Class}">
	<a href="/blog/{slug}" sveltekit:prefetch>
		<img src={image} class="w-full h-[160px]" height="160" alt="{title}" id="card-image" />
	</a>
	<a class:hidden={hide_category} href="/blog/category/{snakeCase(category)}">
		<span class="absolute px-2 text-white rounded top-[5px] left-[5px] category_{snakeCase(category)}">{category}</span>
	</a
	>
	<div class="p-2 pb-8">
		<h2 class="text-xl m-0 pb-1 font-semibold dark:font-medium">
			<a sveltekit:prefetch href="/blog/{slug}" class="visited:text-gray-700 dark:visited:text-white hover:text-red-500 hover:no-underline text-gray-700 dark:text-white dark:hover:text-red-500" id="card-title">{title}
			</a>
		</h2>
		<p id="blog_card__excerpt" class="leading-7 text-base">
			{excerpt}
		</p>
		<small class="text-xs absolute bottom-[5px] font-semibold dark:text-gray-300">
			<time datetime={date}>{new Date(date).toDateString()}</time>
		</small>
	</div>
</article>

<style type="text/css">
	article .card-title {
		color: var(--primary-color);
	}

.category_programming {
	background: var(--category-programming)
}
.category_tips_and_tricks {
	background: var(--category-tips-and-tricks)
}
.category_personal {
	background: var(--category-personal)
}

 #blog_card__excerpt {
 	-webkit-box-orient: vertical;
 	-webkit-line-clamp: 3;
 	display: -webkit-box;
 	overflow: hidden;
 }

</style>
