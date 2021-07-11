<footer class="bg-gray-800 text-gray-400 text-base pt-4 w-full mt-8">
	<div class="flex flex-wrap mb-4 gap-x-20 mx-auto w-full px-4" id="flexible">
		<div class="w-full md:w-auto mb-4">
			<div class="flex items-center justify-center">
			<img src="https://kudadam.sirv.com/logo/logo.png?thumbnail=100&q=30" alt="Kudadam logo">
			<strong class="invisible md:visible">Kudadam</strong>
			</div>
		</div>
		<div>
			<p class="font-bold">Quick Links</p>
			<ul>
				<li><a href="blog/feed">RSS feed</a></li>
				<li><a href="sitemap.xml">Sitemap.xml</a></li>
			</ul>
		</div>
		<div>
			<p class="font-bold">Contact</p>
			<ul>
				<li>
					<a href="mailto:lucretiusbiah@protonmail.com"><span class="fas fa-envelope"></span> Email
					</a>
				</li>
				<li>
					<a href="https://www.github.com/biah" target="_blank">
						<span class="fab fa-github"></span>
						Github
					</a>
				</li>
				<li>
					<span class="fab fa-twitter"></span>
					<a href="https://twitter.com/lucretius_1" target="_blank">Lucretius_1</a>
				</li>
			</ul>
		</div>
		
	</div>

	<div class="text-center">
		<p class="pb-1">
			<span class="block md:inline">Made with <i class="fas fa-heart text-red-500 animate-pulse"></i> and built with <a href="https://sapper.svelte.dev" target="_blank">Sapper</a></span>
			<span class="invisible md:visible">·</span>
			<span>Source code is available on <a target="_blank" href="https://www.github.com/biah/www.kudadam.com"><i class="fab fa-github"></i> Github</a></span>
		</p>
		<p class="bg-black py-2">copyright &copy; 2020 - Now, Lucretius Biah</p>
	</div>
</footer>


<style type="text/css">
	footer * {
		@apply text-base !important;
	}
	#flexible ul {
		padding: 5px;
	}
	#flexible ul li {
		padding: 5px 0px;
	}
	#flexible a {
		color: inherit !important;
		@apply hover:underline;
	}



</style>