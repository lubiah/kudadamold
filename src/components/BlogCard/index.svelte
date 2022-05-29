<!-- 
The Card component is used to house the blog posts
 -->
<script type="text/javascript">
	import { snakeCase } from "$lib/Scripts/util.js";
	import ImageKit from "imagekit-javascript";
	export let image  = "https://ik.imagekit.io/kudadam/logo/logo.png?q=2&canvas.color=white";
	export let title;
	export let date;
	export let slug;
	export let excerpt = "";
	export let category;
	let Class = "";
	let thumbnail = undefined;
	export let hide_category = false;
	export {Class as class};
	const ImagekitTransformer = new ImageKit({
		urlEndpoint: "https://ik.imagekit.io/kudadam"
	})
	if (new URL(image).host === "ik.imagekit.io"){
		thumbnail = ImagekitTransformer.url({
			src: image,
			transformation: [{
				"blur": 10,
				"height": 160,
				"width": 310,
				"quality": 20 
			}]
		});
		image = ImagekitTransformer.url({
			src: image,
			 transition: [{
				 "height": 160,
				 "width": 310,
				 "quality": 70
			 }]
		})
		
	}
</script>

<article class="dark:border-neutral-800 mr-2 hover:shadow-lg rounded mb-9 {Class}">
	<a href="/blog/{slug}" sveltekit:prefetch>
		<img loading="lazy" data-lazy-load={true} src={thumbnail} data-src={image} width="310" height="160" alt="{title}" />
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
		<small class="text-xs font-semibold dark:text-gray-300">
			<time datetime={date}>{new Date(date).toDateString()}</time>
		</small>
	</div>
</article>

<style type="text/postcss">
	article {
		width: 310px;
		border-width: 1px;
		position: relative;
	}
	article .card-title {
		color: var(--primary-color);
	}

	small {
		position: absolute;
		bottom: 5px;
	}

	img {
		width: 100%;
		height: 155px;
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
