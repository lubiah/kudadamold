<!-- 
The Card component is used to house the blog posts
 -->

 <script type="text/javascript">
 	export let image;
 	export let title;
 	export let date;
 	export let slug;
 	export let category;
 	export let hide_category = false;

 	if (category)
 		var category_lowercase = category.toLowerCase().replace(/\s/g,"_");

 	import optimizeSirv from "../../scripts/optimize_image.js";
 </script>
<div class="w-full md:w-1/2 lg:w-1/3 px-2 mb-9 relative" id="card">
	<a rel="prefetch" href="blog/{slug}" class="hover:text-red-500 text-black dark:text-white dark:hover:text-red-500" id="card-title">
		<img src="{optimizeSirv(image)}" class="rounded w-full" alt="" id="card-image">
	</a>
	<a class:hidden={hide_category} href="/blog/category/{category_lowercase}">
	<span class="category category_{category_lowercase}">{category}</span></a>
	<div>
		<h2 class="text-xl mx-1 my-2 font-medium"><a rel="prefetch" href="blog/{slug}" class="hover:text-red-500 text-black dark:text-white dark:hover:text-red-500" id="card-title">{title}</a></h2>
		<small class="text-xs mx-1 font-semibold dark:text-gray-300 text-gray-600">
			<time datetime="{date}">{new Date(date).toDateString()}</time>
		</small>
	</div>
</div>
 

<style type="text/css">

	#card:hover #card-title {
		@apply text-red-500;
	}

	#card-image {
		height: 200px;
	}
	#card-image:empty {
		border: 0;
		border-radius: 5px;
		background-image: linear-gradient(black,grey);
	}


</style>