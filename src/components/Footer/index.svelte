<script>
	import Envelope from '$lib/icons/envelope.svg?component';
	import Telegram from '$lib/icons/logo-telegram.svg?component';
	import Twitter from '$lib/icons/logo-twitter.svg?component';
	import Github from '$lib/icons/logo-github.svg?component';
	import RSS from '$lib/icons/square-rss.svg?component';
</script>

<footer class="text-base bg-gray-200 text-gray-600 pt-4 mt-[50px]">
	<div class="flex gap-x-8 justify-evenly mb-2">
		<div>
			<p>Contact</p>
			<ul class="list-none">
				<li>
					<a data-reset-styles href="mailto:lucretiusbiah@protonmail.com"><Envelope />E-Mail</a>
				</li>
				<li><a data-reset-styles href="https://t.me/kudadam"><Telegram />Telegram</a></li>
				<li><a data-reset-styles href="https://twitter.com/kudadam_"><Twitter />Twitter</a></li>
				<li><a data-reset-styles href="https://github.com/kudadam"><Github /> Github</a></li>
			</ul>
		</div>
		<div>
			<p>Quick Links</p>
			<ul class="list-none">
				<li><a data-reset-styles href="/about">About</a></li>
				<li><a href="/blog" data-reset-styles>Blog</a></li>
				<li><a href="/projects" data-reset-styles>Projects</a></li>
				<li><a href="/blog/feed.xml" data-reset-styles><RSS />RSS Feed</a></li>
			</ul>
		</div>
	</div>
	<p class="text-center px-3 border-gray-300 pt-1 border-t w-[90%] !mx-auto">
		&copy; Copyright 2020 - Now, Lucretius Biah
	</p>
</footer>

<style lang="postcss">
	footer {
		& div p {
			@apply font-semibold mb-1;
		}

		& p {
			@apply m-0 p-0;
		}

		& ul {
			@apply m-0 p-0;

			& a {
				@apply flex gap-x-1 items-center hover:underline;
			}
		}

		& :global(svg) {
			@apply fill-zinc-500 flex-shrink-0 h-[1em];
		}
	}
</style>
