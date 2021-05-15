<!-- 
The Card component is used to house the blog posts
 -->
 <script type="text/javascript">
 	export let image;
 	export let title;
 	export let date;
 	export let slug;
 	export let category;
 </script>
<div class="w-full md:w-1/2 lg:w-1/3 px-2 mb-9 relative">
	<img src="{image}" class="rounded w-full" alt="">
	<span class="category category_{category.replace(/\s/g,'_').toLowerCase()}">{category}</span>
	<div>
		<h2 class="text-xl mx-1 my-2 font-medium"><a rel="prefetch" href="blog/{slug}" class="hover:text-red-500 text-black">{title}</a></h2>
		<small class="text-xs mx-1 font-semibold text-gray-600">
			<time datetime="{date}">{new Date(date).toDateString()}</time>
		</small>
	</div>
</div>
 

<style type="text/css">
	img {
		height: 200px;
	}
	.category {
		position: absolute;
		padding: 2px 5px;
		border-radius: 5px;
		color: white;
		top: 10px;
		left: 15px;
	}
	.category_programming {
		background: orange;
	}
	.category_tips_and_tricks {
		background: #142f54;
	}
	.category_personal {
		background: #01a9bc;
	}
</style>