<script context="module">
	export const prerender = true;
</script>

<script type="text/javascript">
	import SEO from 'svelte-seo';
</script>

<SEO
	title="Kudadam • About"
	description="A page about me. Info contained here is my name and other important stuff about me"
	keywords="about kudadam,about kudadam website,about lucretius, about lucretius biah"
	canonical="https://www.kudadam.com/about"
	openGraph={{
		title: 'Kudadam • About',
		description:
			'A page about me. Info contained here is my name and other important stuff about me',
		url: 'https://www.kudadam.com/about',
		type: 'profile',
		images: [
			{
				url: 'https:kudadam.sirv.com/logo/logo.png',
				width: 850,
				height: 650,
				alt: 'Kudadam Logo'
			}
		]
	}}
	twitter={{
		site: '@kudadam_',
		title: 'Kudadam • About',
		description:
			'A page about me. Info contained here is my name and other important stuff about me',
		image: 'https://kudadam.sirv.com/logo/logo.png',
		imageAlt: 'Logo of Kudadam'
	}}
/>

<h1 class="text-center font-bold">About me</h1>
<div class="xl:w-[65%] mx-auto">
	<img height="300" width="300" 
		src="https://kudadam.sirv.com/profile/lucretius.jpg?thumbnail=300&q=90"
		alt=""
		class="my-4 p-1 border rounded mx-auto"
	/>
	<section>
		<h2>Who am I?</h2>
		<p>
		Hello World <img
			alt="👋"
			class="emojione"
			src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/1f44b.png"
			title=":wave:"
		/>, Am Lucretius Biah.
		<img
			alt="👦"
			class="emojione"
			src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/1f466.png"
			title=":boy:"
		/><br /> Well, to describe myself on this page is a bit difficult as it is hard to find the
		right words to use.<br /> Anyway, let's see how this ends...
	</p>
	</section>
	
	<p>
		My name is Lucretius and welcome to my part of the internet.<br /> Am a 17 y/o self-taught developer
		and I can code in 8+ programming languages but my favourites are Python, JavaScript, Ruby and C++.
	</p>
	<p>
		Am based somewhere in Wakanda🇬🇭.<br /> Professionally, am a full stack developer with 5+ experience, I kinda started coding early.
	</p>
	<section>
		<h2>When am not coding...</h2>
		<p>
		 Am a bookworm<img
			alt="📘"
			class="emojione"
			src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/1f4d8.png"
			title=":blue_book:"
		/>. My favourite story book is
		<a href="https://en.wikipedia.org/wiki/The_Hardy_Boys">Hardy Boys</a>
		by <a href="https://en.wikipedia.org/wiki/Franklin_W._Dixon">Franklin Dixon</a>.<br /> It's a
		series, am yet to finish it. Also, I spend most times on <a href="https://play.google.com/store/apps/details?id=com.light.reader.books&hl=en&gl=US" target="_blank">Light Reader app</a> reading novels.<br /> Am a gamer, I mostly complete every game I start
		<em class="text-muted">(Not bragging)</em>. I have completed about 35+ and without cheats<img
			alt="😎"
			class="emojione"
			src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/1f60e.png"
			title=":sunglasses:"
		/>.<br /> I love music too, but I don't have a favourite.<br /> I write in my diary in my spare time,
		code when I have a computer close-by and play games when am bored.
	</p>
	</section>
	<section>
		<h2>Some stats about me</h2>
		<div class="flex flex-wrap gap-3 my-5">
	<div class="">
		<img
			src="https://github-readme-stats.vercel.app/api?username=kudadam&count_private=true&show_icons=true&theme=radical"
			alt=""
		/>
	</div>
	<div class="">
		<img
			src="https://github-readme-stats.vercel.app/api/top-langs/?username=kudadam&langs_count=9"
			alt=""
		/>
	</div>
	<div class="">
		<img src="https://github-readme-stats.vercel.app/api/wakatime?username=Lucretius" alt="" />
	</div>
</div>
	</section>
</div>



<style type="text/css">
	.emojione {
		height: 1.2rem;
		display: inline;
	}
</style>
