<script type="text/javascript">
	import Head from 'svelte-seo';
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

	export let articles, projects;

	let texts = [
		"A full-stack web developer",
		"A software developer",
		"An open-source enthusiast",
		"A frequent gamer🎮",
		"An avid reader📗",
		"A fan of Hardy Boys books"
		];
	let textsCounter = 0;
	let currentText = texts[0];
	let TypeWriter;
	let BlogCard;
	let ProjectCard;

	setInterval(()=>{
		currentText = texts[(textsCounter + 1) % texts.length];
		textsCounter++;
	},4000);

	onMount(async ()=>{
		let Aos = await import("aos").then(e => e.default);
		BlogCard = await import("$lib/Components/BlogCard").then(e=> e.default);
		ProjectCard = await import("$lib/Components/ProjectCard").then(e=> e.default);
		TypeWriter = await import("typeit").then(e=> e.default);
		await import("aos/dist/aos.css");
		Aos.init({
			duration: 1500,
			once: true
		});
	});


	const sectionTwo = node =>{
		const animateSection = ()=>{
			let element = event.detail;
			let elementContent = element.innerHTML;
			element.innerHTML = "";
			const TypeIt = new TypeWriter(node, {
				speed: 40,
				afterComplete: instance =>{
					instance.destroy(true)
				}
			})
			.type(elementContent)
			.break()
			.type("I can torn an ordinary")
			.move(-14)
			.delete(1)
			.type("u")
			.move(14)
			.type(" <span class='ordinary-item'></span>")
			.type(" into this <span class='unique-item animate-bounce'></span>")
			.type(" with <span class='text-green-500'>&lt;/</span>code<span class='text-green-500'>&gt;</span>")
			.go()
		}
		document.addEventListener("aos:in:section-two", animateSection)
	}

	const SEO = {
		title: "Lucretius Biah • Kudadam",
		description: "Hey, am Lucretius, a software developer and website designer. Welcome to my part of the internet. Feel free to read my blog, download my software or just look around",
		keywords: "lucretius, biah, lucretius biah, lucretius website",
		canonical: "https://www.kudadam.com"

	}

</script>

<Head
	title={SEO.title}
	description={SEO.description}
	keywords= {SEO.keywords}
	canonical={SEO.canonical}

	openGraph={{
		title: `${SEO.title}`,
		description: `${SEO.description}`,
		url: `${SEO.canonical}`,
		type: 'website',
		images: [
			{
				url: 'https:imagekit.io/kudadam/logo/logo.png?q=50&w=850&h=650',
				width: 850,
				height: 650,
				alt: 'Kudadam Logo'
			}
		]
	}}

	twitter={{
		site: '@kudadam_',
		title: `${SEO.title}`,
		description: `${SEO.description}`,
		image: 'https:imagekit.io/kudadam/logo/logo.png?q=50&w=850&h=650',
		imageAlt: 'Logo of Kudadam'
	}}

	jsonLd={{
		"@type": "Website",
		url: `${SEO.canonical}`,
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: "https://www.kudadam.com/search?q={search_term_string}"
			},
			"query-input": "required name=search_term_string"
		}
	}}
/>


<main>
	<section class="grid  grid-cols-3 items-center justify-center section">
		
		<div class="col-span-3 md:col-span-2">
			<h1 class="display-1" id="me-text">Hey, I'm Lucretius</h1>
			<p class="display-8">
				{#key currentText}<span style:display="inline-block" in:fade>{currentText}</span>{/key} located somewhere in Wakanda🌍. Welcome to my part of the internet where I <a href="/projects">showcase my projects</a> and <a href="/blog">write about tech and non-techy stuff</a>.
			</p>
		</div>
		<img
		class="mx-auto col-span-3 md:col-span-1"
		src="https://ik.imagekit.io/kudadam/profile/avatar.svg?q=1"
		alt="Cartoonish boy winking his eye"
		height="370"
		width="370"
	/>
	</section>
	<section class="grid grid-cols-3 items-center  justify-center gap-4">
		<h2 class="display-4 font-bold text-center col-span-3" data-aos="fade-down">What I do?</h2>
		<div class="col-span-3 md:col-span-2 display-8" data-aos="fade-right" id="section-two-child-container" data-aos-id="section-two" use:sectionTwo>
			
I design stunning web interfaces using cutting-edge web technologies with a key🔑 focus on accessibility and responsiveness to ensure users will have a great user experience💡.
		</div>
		<img data-aos="fade-left" class="col-span-3 row-start-2 md:row-start-[unset] md:col-span-1 mx-auto" alt="A developer standing by portfolio" src="https://ik.imagekit.io/kudadam/svg/showing_resume.svg?q=1" width="450" height="450" loading="lazy"/>
	</section>
	<section class="grid grid-cols-3 items-center justify-center  gap-4">
		<img height="450" width="450" data-aos="flip-right" data-aos-id="section-three" class="col-span-3 md:col-span-1" src="https://ik.imagekit.io/kudadam/svg/dev.svg?q=1" alt="Developer sitting in front of a laptop">
		<div class="display-8 col-span-3 md:col-span-2" data-aos="flip-left">
			When I am not designing user interfaces, I develop software and write the behind-the-scenes code that makes a website function. I do everything database, servers and caching
		</div>
	</section>
	<section>
		<div data-aos="zoom-in-down" class="text-center">
			<h2 class="display-4">Writing✍️</h2>
			<p>Over here is a list of some articles I have written</p>
		</div>
		<section class="flex overflow-auto snap-x xl:fancy-scrollbar">
			<div class="flex gap-x-4 pt-4">
				{#each articles as article}
					<svelte:component this={BlogCard} 
					class="snap-center"
					image = {article.image}
					title = {article.title}
					date = {article.date}
					slug = {article.slug}
					excerpt = {article.excerpt}
					category = {article.category}
					/>
				{/each}
			</div>
		</section>
	</section>
	<section>
		<div data-aos="zoom-in-down" class="text-center">
			<h2 class="display-4">Projects🚀</h2>
			<p>A few things I have built</p>
		</div>
		<section class="flex overflow-auto snap-x xl:fancy-scrollbar">
			<div class="flex gap-x-4 pt-4">
				{#each projects as project }
					<svelte:component this={ProjectCard} 
					title = {project.name}
					description = {project.description}
					image = {project.image}
					repo = {project.repo}
					url = {project.url}
					 />
				
				{/each}
			</div>
		</section>
	</section>
</main>

<style type="text/postcss">

	section {
		@apply mb-[180px];
	}
	#me-text {
		background: linear-gradient(to right,#008cff,#70fa00);
		background-clip: text;
		color: transparent;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	main {
	@apply overflow-x-hidden;
	}

	:global(#layout_root){
		@apply overflow-x-hidden;
	}

	:global(.ordinary-item) {
		height: 30px;
		width: 30px;
		display: inline-block;
		background: black;

	}

	:global(.unique-item){
		display: inline-block;
		height: 30px;
		border-radius: 50%;
		width: 30px;
		background: radial-gradient(circle at 10px 10px, #ff0c0c, #000);	
	}

</style>
