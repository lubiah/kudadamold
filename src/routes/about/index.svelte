<script context="module">
	export const prerender = true;
</script>

<script type="text/javascript">
	import SEO from 'svelte-seo';
	let meta = {
	    title: "Kudadam • About - Everything about Lucretius Biah",
	    description: "Hey, am Lucretius Biah. A 17 year old developer located in Wakanda. I program useful softwares and also help to design beautiful websites. This is my personal website where I write almost anything i like",
	    keywords: "about kudadam, about lucretius biah, about lucretius biah, about teen developer, lucretius biah, lucretius, lucretius programmer",
	    canonical: "https://www.kudadam.com/about",
	    image: "https://lucretius.sirv.com/profile/lucretius.jpg"
	    
	};
</script>

<SEO
	title={meta.title}
	description={meta.description}
	keywords={meta.keywords}
	canonical={meta.canonical}
	
	openGraph={{
		title : `${meta.title}`,
		description: `${meta.description}`,
		url: `${meta.canonical}`,
		type: 'profile',
		images: [
			{
				url: "https://lucretius.sirv.com/profile/lucretius.jpg?q=5&w=850&h=650",
				width: 850,
				height: 650,
				alt: 'Kudadam Profile image'
			}
		]
	}}
	twitter={{
		site: '@kudadam_',
		title: `${meta.title}`,
		description: `${meta.description}`,
		image: "https://lucretius.sirv.com/profile/lucretius.jpg?q=5",
		imageAlt: 'Profile image of Lucretius'
	}}
	
	jsonLd = {{
	    "@type": "AboutPage",
	    description: `${meta.description}`,
	    image: `https://lucretius.sirv.com/profile/lucretius.jpg?q=10`,
	    mainEntityOfPage: `${meta.canonical}`,
	    url: `${meta.canonical}`,
	    breadcrumb: {
	        "@type": "BreadcrumbList",
	        "itemListElement": [{
	            "@type": "ListItem",
	            position: 1,
	            name: "About"
	        }]
	    }
	    
	}}
/>

<main class="max-w-4xl mx-auto">
	<h1 class="text-center font-bold">About me</h1>
	<img height="300" width="300" 
		src="https://lucretius.sirv.com/profile/lucretius.jpg?thumbnail=300&q=90"
		alt=""
		class="my-4 p-1 border rounded mx-auto"
	/>
	<section>
		<h2>Who am I?</h2>
		<p>
		Hello World👋, Am Lucretius Biah 👦.
		<br /> Well, to describe myself on this page is a bit difficult as it is hard to find the
		right words to use.<br /> Anyway, let's see how this ends...
	</p>
	</section>
	<p>
		My name is Lucretius and welcome to my part of the internet.<br /> Am an 18 y/o self-taught developer
		and I can code in 8+ programming languages but my favourites are Python, JavaScript, Ruby and C++.<br/>
		Am based somewhere in Wakanda🇬🇭
	</p>

	<section>
	  <h2>What I do?</h2>
	  <p>
	    Professionally, am a software and website developer. I am able to build reliable softwares as well as build accessible, interactive websites.
	  </p>
	</section>
	<section>
		<h2>When am not coding...</h2>
		<p>
		 Am a bookworm<img
			alt="📘"
			class="emojione"
			src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/1f4d8.png"
			title=":blue_book:"
		/>. My favourite story book is
		<a href="https://en.wikipedia.org/wiki/The_Hardy_Boys" target="_blank">Hardy Boys</a>
		by <a href="https://en.wikipedia.org/wiki/Franklin_W._Dixon" target="_blank">Franklin Dixon</a>.<br /> It's a
		series, am yet to finish it. Also, I spend most times on <a href="https://play.google.com/store/apps/details?id=com.light.reader.books&hl=en&gl=US" target="_blank">Light Reader app</a> reading novels.<br /> Am a gamer, I mostly complete every game I start
		<em class="text-muted">(Not bragging)</em>. I have completed about 35+ and without cheats<img
			alt="😎"
			class="emojione"
			src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/1f60e.png"
			title=":sunglasses:"
		/>.<br /> I love music 🎶 too, but I don't have a favourite.<br /> I write in my diary📓 in my spare time,
		code when I have a computer close-by and play games when am bored.
	</p>
	</section>
	<section>
		<h2>Some Github stats about me</h2>
		<div class="flex flex-wrap gap-3 my-5">
	<div class="">
		<img
			src="https://github-readme-stats.vercel.app/api?username=kudadam&count_private=true&show_icons=true&theme=radical"
			alt=""
		/>
	</div>
	<div class="">
		<img
			src="https://github-readme-stats.vercel.app/api/top-langs/?username=kudadam&langs_count=10"
			alt=""
		/>
	</div>
	<div class="">
		<img src="https://github-readme-stats.vercel.app/api/wakatime?username=Lucretius" alt="" />
	</div>
</div>
	</section>
</main>



<style type="text/css">
	.emojione {
		height: 1.2rem;
		display: inline;
	}
</style>
