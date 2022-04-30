<script type="text/javascript">
	import Head from 'svelte-seo';
	import { onMount } from "svelte";
	import { importScripts } from '$lib/Scripts/util';
	import ImageKit from "imagekit-javascript";

	const SEO = {
	    title: "About - Everything about Lucretius Biah • Kudadam",
	    description: "Hey, am Lucretius Biah. A 17 year old developer located in Wakanda. I program useful softwares and also help to design beautiful websites. This is my personal website where I write almost anything i like",
	    keywords: "about kudadam, about lucretius biah, about lucretius biah, about teen developer, lucretius biah, lucretius, lucretius programmer",
	    canonical: "https://www.kudadam.com/about",
	    image: "https://lucretius.sirv.com/profile/lucretius.jpg"
	    
	};
	const certificates = [
		{
			title: "HackerRank Python (Basic) Certificate",
			date: new Date("17-07-2021"),
			image_url: "https://ik.imagekit.io/kudadam/me/certificates/hackerrank_python_beginner_py4W8_AXe.png"
		}
	];
	
	onMount(async ()=>{
		await importScripts("https://cdnjs.cloudflare.com/ajax/libs/fslightbox/3.3.1/index.min.js");
	});

	let ImageKitModule = new ImageKit({
		urlEndpoint: "https://ik.imagekit.io/kudadam"
	});
</script>

<Head

	title={SEO.title}
	description={SEO.description}
	keywords={SEO.keywords}
	canonical={SEO.canonical}
	
	openGraph={{
		title : `${SEO.title}`,
		description: `${SEO.description}`,
		url: `${SEO.canonical}`,
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
		title: `${SEO.title}`,
		description: `${SEO.description}`,
		image: "https://lucretius.sirv.com/profile/lucretius.jpg?q=5",
		imageAlt: 'Profile image of Lucretius'
	}}
	
	jsonLd = {{
	    "@type": "AboutPage",
	    description: `${SEO.description}`,
	    image: `https://lucretius.sirv.com/profile/lucretius.jpg?q=10`,
	    mainEntityOfPage: `${SEO.canonical}`,
	    url: `${SEO.canonical}`,
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

<main>
	<article>
		<section>
			<div class="text-center">
				<h1>Me, Myself & I</h1>
				<img class="block mx-auto border rounded p-2 dark:border-gray-700" loading="eager" src="https://ik.imagekit.io/kudadam/me/cartoon_me_1?tr=w-300,h-300,q-90"  alt="Lucretius Kudadam Biah">
			</div>
		<h2>Who am I?</h2>
		<p>
			Hello World👋, Am Lucretius K. Biah 👦<br/>
			Well, to describe myself on this page is a bit difficult as it is hard to find the right words to use.
			Anyway, let's see how this ends...🤔
		</p>
		<p>
			My name is Lucretius and welcome to my part of the internet.<br/>
			Am an 18 y/o self-taught developer and I can code in 5+ programming languages but my favourites are JavaScript, Python and Ruby.<br/>
			Am based somewhere in Wakanda🇬🇭
		</p>
		</section>
		<section>
			<h2>What I do</h2>
			<p>
				Simply put, I develop software and design websites.<br/>
				I entered into the world of programming as a software developer<small class="italic before:[content:'('] after:[content:')']">which I still am</small> starting with the Python programming language, before Python, I used to code in bash and shell script.<br/>
			</p>
			<p>
				Then I decided to learn HTML to create a webpage to showcase my softwares, learnt CSS to style it and also learnt JavaScript to make it interactive.
				I realized HTML was making me repeat so much code so I decided to learn PHP and separate my HTML into chunks. MySQL followed because I started blogging and I wanted to store the blog posts in a database and render them through PHP.<br/>
				Long story short, I became a web developer and learnt fundamental web development skills.
			</p>
		</section>
		<section>
			<h2>Languages, Frameworks & Skills</h2>
			<ul class="list-none grid grid-cols-1 md:grid-cols-2" id="skills">
				<li>HTML</li>
				<li>CSS</li>
				<li>JavaScript</li>
				<li>PHP</li>
				<li>Python</li>
				<li>Jquery</li>
				<li>Ruby</li>
				<li>Svelte</li>
				<li>SASS</li>
				<li>C++</li>
				<li>MySQL</li>
				<li>NodeJS</li>
			</ul>
		</section>
		<section>
			<h2>When am not coding...</h2>
			<p>
				Am a bookworm📘. My favourite story book is <a href="https://en.wikipedia.org/wiki/The_Hardy_Boys" target="_blank">Hardy Boys</a> by <a href="https://en.wikipedia.org/wiki/Franklin_W._Dixon" target="_blank">Franklin Dixon</a>.<br/>
				I spend most time reading books, if not a hardcopy book, then online versions.<br/>
				Also, I do play games, a lot, I almost complete every game I start<small>(not bragging)</small>.
			</p>
			<p>
				I love music 🎶 too, but I don't have a favourite.<br/>
				I write in my diary📓 in my spare time, code when I have a computer close-by and play games when am bored.				
			</p>
		</section>
		<section>
			<h2>Certificates & Achivements</h2>
			<div class="flex">
				{#each certificates as certificate}
				{@const thumbImage = ImageKitModule.url({
					src: certificate.image_url,
					transformation: [{
						"height":300,
						"width":300,
						"quality":30
					}]
				})}
					<a data-fslightbox="gallery" href="{certificate.image_url}" class="block">
						<img height="300" width="300" src="{thumbImage}" alt="{certificate.title}">
						<span>{certificate.title}</span>
					</a>
				{/each}
			</div>
		</section>
	</article>
</main>

 <style type="text/postcss">
 	main {
 		display: grid;
 		grid-template-columns: 1fr min(100%, 65ch) 1fr;
 	}

 	article {
 		grid-column: 2/3;
 	}

	#skills li {
		@apply border-t py-2 dark:border-gray-700;
	}
 </style>