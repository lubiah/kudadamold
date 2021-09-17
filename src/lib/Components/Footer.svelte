<footer class="bg-gray-800 text-gray-400 text-base pt-4 mt-8">
	<div class="pl-3 flex flex-wrap justify-center gap-x-10 mt-4 mb-2" id="flexible">
		<div>
			<p class="font-bold">Quick Links</p>
			<ul>
				<li><a href="/blog/feed">RSS feed</a></li>
				<li><a href="/sitemap.xml">Sitemap.xml</a></li>
			</ul>
		</div>
		<div>
			<p class="font-bold">Contact</p>
			<ul>
				<li>
					<a href="mailto:lucretiusbiah@protonmail.com"><span class="fas fa-envelope" /> Email </a>
				</li>
				<li>
					<a href="https://www.github.com/biah" target="_blank">
						<span class="fab fa-github" />
						Github
					</a>
				</li>
				<li>
					<span class="fab fa-twitter" />
					<a href="https://twitter.com/lucretius_1" target="_blank">Lucretius_1</a>
				</li>
			</ul>
		</div>
	</div>

	<div class="text-center">
		<p class="pb-1">
			<span class="block md:inline"
				>Made with <i class="fas fa-heart text-red-500 animate-pulse" /> and built with
				<a href="https://kit.svelte.dev" target="_blank">Svelte-Kit</a></span
			>
			<span class="invisible md:visible">·</span>
			<span
				>Source code is available on <a
					target="_blank"
					href="https://www.github.com/biah/www.kudadam.com"><i class="fab fa-github" /> Github</a
				></span
			>
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

	ul {
		list-style: none;
	}
</style>
