<script>
	import Github from "$lib/Icons/github.svelte";
	import Twitter from "$lib/Icons/twitter.svelte";
	import Envelope from "$lib/Icons/envelope.svelte";
	import RSS from "$lib/Icons/rss.svelte";
	import Heart from "$lib/Icons/heart.svelte";
	import Subscribe from "$lib/Components/NewsletterSubscribeForm";
</script>

<footer class="bg-gray-800 text-gray-400 text-base pt-4 mt-14 md:relative w-fullx`x">
	<div class="px-3 flex flex-wrap justify-evenly xl:justify-center  gap-x-20 mt-4 mb-2" id="flexible">
		<div class="xl:absolute xl:-top-8 mb-6 xl:left-4">
			<Subscribe/>
		</div>
		<div>
			<p class="font-bold">Quick Links</p>
			<ul>
				<li><a href="/blog/feed"><RSS/> RSS feed</a></li>
				<li><a href="/sitemap.xml">Sitemap.xml</a></li>
			</ul>
		</div>
		<div>
			<p class="font-bold">Contact</p>
			<ul>
				<li>
					<a href="mailto:lucretiusbiah@protonmail.com"><Envelope/> Email </a>
				</li>
				<li>
					<a href="https://www.github.com/kudadam" target="_blank" rel="noopener">
						<Github/>
						Github
					</a>
				</li>
				<li>
					<a href="https://twitter.com/kudadam_" target="_blank" rel="noopener"><Twitter/>kudadam_</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="text-center">
		<p class="pb-1">
			<span class="block md:inline"
				>Made with <Heart class="text-red-500 animate-pulse"/> and built with
				<a href="https://kit.svelte.dev" target="_blank" rel="noopener">SvelteKit</a></span
			>
			<span class="invisible md:visible">·</span>
			<span
				>Source code is available on <a
					target="_blank"
					rel="noopener"
					href="https://www.github.com/kudadam/www.kudadam.com">Github</a
				></span
			>
		</p>
		<p class="bg-black py-2 m-0">copyright &copy; 2020 - Now, Lucretius Biah</p>
	</div>
</footer>

<style type="text/postcss">
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
